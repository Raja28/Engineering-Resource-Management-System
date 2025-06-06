

export interface ProjectForm {
    projectId: string,
    name: String,
    description: String,
    startDate: Date,
    engineer?: string,
    endDate: Date,
    requiredSkills: string[] | string,
    teamSize: Number,
    status: 'planning' | 'active' | 'completed',
    managerId?: string

}