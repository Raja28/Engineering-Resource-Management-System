

export interface ProjectForm {
    name: String,
    description: String,
    startDate: Date,
    engineer: string,
    endDate: Date,
    requiredSkills: [String],
    teamSize: Number,
    status: 'planning' | 'active' | 'completed',
    managerId: string

}