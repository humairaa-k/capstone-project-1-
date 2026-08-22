import { render, screen } from "@testing-library/react";
import EmptyState from "@/components/common/EmptyState";
import { BookmarkPlus } from "lucide-react";

describe("EmptyState Component", () => {

  it("renders title correctly", () => {
    render(
      <EmptyState
        title="No Saved Opportunities"
        description="Save opportunities to see them here."
        icon={BookmarkPlus}
      />
    );
    expect(screen.getByText("No Saved Opportunities")).toBeInTheDocument();
  });

  it("renders description correctly", () => {
    render(
      <EmptyState
        title="No Results"
        description="Try a different search."
        icon={BookmarkPlus}
      />
    );
    expect(screen.getByText("Try a different search.")).toBeInTheDocument();
  });

  it("renders button when showButton is true", () => {
    render(
      <EmptyState
        title="Empty"
        description="Nothing here."
        icon={BookmarkPlus}
        buttonText="Browse Now"
        buttonHref="/opportunities"
        showButton={true}
      />
    );
    expect(screen.getByText("Browse Now")).toBeInTheDocument();
  });

  it("does not render button when showButton is false", () => {
    render(
      <EmptyState
        title="Empty"
        description="Nothing here."
        icon={BookmarkPlus}
        showButton={false}
      />
    );
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders icon", () => {
    render(
      <EmptyState
        title="Empty"
        description="Nothing here."
        icon={BookmarkPlus}
      />
    );
    expect(screen.getByText("Empty")).toBeInTheDocument();
  });

});