var initialState = {
    userProfilePic: '',
    userBio: '',
    userSkills: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_USER_BIO':
            return {
                ...state,
                userBio: action.updatedBio
            }
        case 'UPDATE_USER_SKILLS':
            return {
                ...state,
                userSkills: action.updatedSkills
            }
        case 'UPDATE_USER_PROFILE_PIC': 
            return {
                ...state,
                userProfilePic: action.updatedProfilePic
            }
        default: 
            return state;
    }
}