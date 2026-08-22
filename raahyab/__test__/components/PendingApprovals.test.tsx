import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PendingApprovals from "@/components/dashboard/admin/PendingApprovals";
import type { Opportunity } from "@/types";

// next-intl's useTranslations pulls real strings from messages/*.json, which
// we don't want this test coupled to. Mock it to return the translation key
// (plus a serialized copy of any interpolation values), so assertions target
// stable, predictable output regardless of actual copy or which locale files
// exist.
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) =>
    values ? `${key}::${JSON.stringify(values)}` : key,
}));

const NOW = new Date("2026-08-22T12:00:00Z");

function daysAgo(n: number) {
  return new Date(NOW.getTime() - n * 24 * 60 * 60 * 1000).toISOString();
}

function makeOpportunity(overrides: Partial<Opportunity> = {}): Opportunity {
  return {
    id: "1",
    title: "Frontend Developer Intern",
    organization: "Kabul Tech",
    category: "Internship",
    location: "Kabul",
    type: "Remote",
    deadline: daysAgo(-30),
    description: "A beginner friendly internship",
    requirements: ["React"],
    tags: ["React"],
    applyLink: "https://example.com",
    status: "pending",
    featured: false,
    createdAt: daysAgo(1),
    updatedAt: undefined,
    pendingAction: null,
    previousState: null,
    ...overrides,
  } as Opportunity;
}

beforeEach(() => {
  jest.useFakeTimers().setSystemTime(NOW);
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({}),
  }) as jest.Mock;
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

describe("PendingApprovals", () => {
  it("shows the empty state when there are no pending opportunities", () => {
    render(<PendingApprovals data={[]} />);
    expect(screen.getByText("pendingApprovals.nothingWaiting")).toBeInTheDocument();
  });

  it("renders the waiting count badge with the item count", () => {
    const data = [makeOpportunity({ id: "1" }), makeOpportunity({ id: "2" })];
    render(<PendingApprovals data={data} />);

    expect(
      screen.getByText('pendingApprovals.waiting::{"count":2}')
    ).toBeInTheDocument();
  });

  it("renders each opportunity's title and organization", () => {
    const data = [
      makeOpportunity({ id: "1", title: "Frontend Intern", organization: "Kabul Tech" }),
      makeOpportunity({ id: "2", title: "Backend Job", organization: "TechCorp" }),
    ];
    render(<PendingApprovals data={data} />);

    expect(screen.getByText("Frontend Intern")).toBeInTheDocument();
    expect(screen.getByText("Kabul Tech")).toBeInTheDocument();
    expect(screen.getByText("Backend Job")).toBeInTheDocument();
    expect(screen.getByText("TechCorp")).toBeInTheDocument();
  });

  it("sorts opportunities by longest-waiting first", () => {
    const data = [
      makeOpportunity({ id: "1", title: "Waited 1 day", createdAt: daysAgo(1) }),
      makeOpportunity({ id: "2", title: "Waited 5 days", createdAt: daysAgo(5) }),
      makeOpportunity({ id: "3", title: "Waited 3 days", createdAt: daysAgo(3) }),
    ];
    const { container } = render(<PendingApprovals data={data} />);

    const titles = Array.from(container.querySelectorAll("p.text-sm.font-medium")).map(
      (el) => el.textContent
    );
    expect(titles).toEqual(["Waited 5 days", "Waited 3 days", "Waited 1 day"]);
  });

  it("uses updatedAt instead of createdAt for the waiting calculation when present", () => {
    const data = [
      makeOpportunity({
        id: "1",
        title: "Old but recently edited",
        createdAt: daysAgo(20),
        updatedAt: daysAgo(1),
      }),
      makeOpportunity({
        id: "2",
        title: "New but never edited",
        createdAt: daysAgo(5),
        updatedAt: undefined,
      }),
    ];
    const { container } = render(<PendingApprovals data={data} />);

    const titles = Array.from(container.querySelectorAll("p.text-sm.font-medium")).map(
      (el) => el.textContent
    );
    // "New but never edited" waited 5 days (via createdAt) vs 1 day for the
    // other (via updatedAt), so it should sort first.
    expect(titles).toEqual(["New but never edited", "Old but recently edited"]);
  });

  it("shows the urgent pulse indicator when any item has waited 3+ days", () => {
    const data = [makeOpportunity({ id: "1", createdAt: daysAgo(3) })];
    const { container } = render(<PendingApprovals data={data} />);

    expect(container.querySelector(".animate-ping")).toBeInTheDocument();
  });

  it("does not show the urgent pulse indicator when nothing has waited 3+ days", () => {
    const data = [makeOpportunity({ id: "1", createdAt: daysAgo(1) })];
    const { container } = render(<PendingApprovals data={data} />);

    expect(container.querySelector(".animate-ping")).not.toBeInTheDocument();
  });

  it("shows a delete-request badge for pendingAction 'delete'", () => {
    const data = [makeOpportunity({ id: "1", pendingAction: "delete" })];
    render(<PendingApprovals data={data} />);

    expect(screen.getByText("pendingApprovals.deleteRequest")).toBeInTheDocument();
  });

  it("shows an edit-request badge for pendingAction 'edit'", () => {
    const data = [makeOpportunity({ id: "1", pendingAction: "edit" })];
    render(<PendingApprovals data={data} />);

    expect(screen.getByText("pendingApprovals.editRequest")).toBeInTheDocument();
  });

  it("approving removes the item immediately and calls the decision API", async () => {
    const user = userEvent.setup({ delay: null });
    const data = [makeOpportunity({ id: "1", title: "Frontend Intern" })];
    render(<PendingApprovals data={data} />);

    await user.click(screen.getByText("pendingApprovals.accept"));

    expect(screen.queryByText("Frontend Intern")).not.toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith("/api/opportunities/1/decision", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "approve" }),
    });
  });

  it("rejecting removes the item immediately and calls the decision API", async () => {
    const user = userEvent.setup({ delay: null });
    const data = [makeOpportunity({ id: "1", title: "Frontend Intern" })];
    render(<PendingApprovals data={data} />);

    await user.click(screen.getByText("pendingApprovals.decline"));

    expect(screen.queryByText("Frontend Intern")).not.toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith("/api/opportunities/1/decision", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "reject" }),
    });
  });

  it("only removes the acted-on item, leaving the rest of the list intact", async () => {
    const user = userEvent.setup({ delay: null });
    const data = [
      makeOpportunity({ id: "1", title: "Keep me", createdAt: daysAgo(1) }),
      makeOpportunity({ id: "2", title: "Approve me", createdAt: daysAgo(2) }),
    ];
    render(<PendingApprovals data={data} />);

    const row = screen.getByText("Approve me").closest("div")!.parentElement!;
    await user.click(within(row).getByText("pendingApprovals.accept"));

    expect(screen.queryByText("Approve me")).not.toBeInTheDocument();
    expect(screen.getByText("Keep me")).toBeInTheDocument();
  });
});