export interface Opportunity {
  id: string
  title: string
  organization: string
  category: string
  location: string
  type: string
  deadline: string
  description: string
  requirements: string[]
  applyLink: string
  tags: string[]
  createdAt: string
  featured: boolean
  status: "pending" | "approved"
  updatedAt? : string
  previousState?: Partial<Opportunity>
}