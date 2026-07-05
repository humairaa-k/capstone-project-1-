
export type CategoryDataType = {
  id: number;
  title: string;
  category: string;
  slug: string;
  iconSrc: string;
};

export const categories: CategoryDataType[] = [
{
  id: 1,
  title: "Jobs",
  category: "Job",
  slug: "jobs",
  iconSrc: "/cat-icons/jobs.png",
},
  {
    id: 2,
    title: "Scholarships",
    category: "Scholarship",
    slug: "scholarships",
    iconSrc: "/cat-icons/scholarships.png",
  },
  {
    id: 3,
    title: "Internships",
    category: "Internship",
    slug: "internships",
    iconSrc: "/cat-icons/internships.png",
  },
  {
    id: 4,
    title: "Remote Work",
    category: "Remote Work",
    slug: "remote-work",
    iconSrc: "/cat-icons/remotework.png",
  },
  {
    id: 5,
    title: "Courses",
    category: "Online Course",
    slug: "courses",
    iconSrc: "/cat-icons/courses.png",
  },
  {
    id: 6,
    title: "Training",
    category: "Training",
    slug: "training",
    iconSrc: "/cat-icons/training.png",
  },
  {
    id: 7,
    title: "Volunteer",
    category: "Volunteer",
    slug: "volunteer",
    iconSrc: "/cat-icons/volunteer.png",
  },

]

