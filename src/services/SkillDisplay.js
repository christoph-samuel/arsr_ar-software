import axios from 'axios';

export class SkillDisplay {
    getSkillSet(id) {
        let url = 'https://www.skilldisplay.eu/api/v1/skillset/' + id + '?includeFullSkills'
        return axios.get(url).then(response => {
            return response.data
        });
    }
}