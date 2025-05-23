import { createStore } from "zustand"

export type MainState = {
    listItemMenu: { title: string, link: string, icon: string, description: string }[]
}
export type Actions = {
    addItemMenu: (item: { title: string, link: string, icon: string, description: string }) => void

}

const defaultState = {
    listItemMenu: [
        {
            title: 'OVERVIEW',
            link: '/dashboard/cms',
            icon: '/Overview.svg',
            description: 'Check Overview Of Your Portfolio'
        }, {
            title: 'PREVIEW PORTFOLIO',
            link: '/portfolio',
            icon: '/Screen.svg',
            description: 'Check Overview Of Your Portfolio'
        }, {
            title: 'HERO SECTION',
            link: '/dashboard/cms/hero',
            icon: '/medal.svg',
            description: 'Edit Hero Section'
        }, {
            title: 'ABOUT SECTION',
            link: '/dashboard/cms/about',
            icon: '/about-us.svg',
            description: 'Edit Hero Section'
        }, {
            title: 'SOCIAL MEDIA',
            link: '/dashboard/cms/socialmedia',
            icon: '/contacts.svg',
            description: 'Edit Your Social Media Links'
        }, {
            title: 'SKILLS',
            link: '/dashboard/cms/skills',
            icon: '/skills.svg',
            description: 'Edit Your Skills Details'
        }, {
            title: 'PROJECTS',
            link: '/dashboard/cms/projects',
            icon: '/projects.svg',
            description: 'Edit Your List Projects'
        }, {
            title: 'EXPERIENCE',
            link: '/dashboard/cms/experience',
            icon: '/experience.svg',
            description: 'Edit Experience Section'
        },
    ]
}

export const createMainStore = (initialState: MainState = defaultState) => {
    return createStore<MainState>((set) => ({
        ...initialState,
        addItemMenu: (newItem: { title: string, link: string, icon: string, description: string }) => set(state => ({
            listItemMenu: [...state.listItemMenu, newItem]
        }))
    }))
}