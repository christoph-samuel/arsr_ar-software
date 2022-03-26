import axios from 'axios'
import {sha256} from 'js-sha256'

export class SkillDisplay {
    apiKey = "5a0a96ad-ff57-4cf0-8281-8486472aaa34"
    // apiKey = "5de7d6b5-e63e-4d47-b3c8-f365f997d1d3"

    getSkillSet(id) {
        let url = 'https://www.skilldisplay.eu/api/v1/skillset/' + id + '?includeFullSkills'
        // let url = 'https://dev.skilldisplay.eu/api/v1/skillset/' + id + '?includeFullSkills'
        return axios.get(url, {headers: {"x-api-key": this.apiKey}}).then(response => {
            return response.data
        });
    }

    getSkill(id) {
        let url = 'https://www.skilldisplay.eu/api/v1/skill/' + id
        // let url = 'https://dev.skilldisplay.eu/api/v1/skill/' + id
        return axios.get(url, {headers: {"x-api-key": this.apiKey}}).then(response => {
            return response.data
        });
    }

    setVerification(skillSetID, skillId, level) {
        let url = 'https://www.skilldisplay.eu/api/v1/verification/create'
        // let url = 'https://dev.skilldisplay.eu/api/v1/verification/create'
        let secret = '1500e6ea-41fa-41cd-bcdb-fd4e9434e2e9';
        // let secret = 'ba19cee0-1c91-4195-906d-491e04a2dd11';
        let signature = level === "self" ? 'sdself' : secret
        let requestData = {
            'SkillSetId': skillSetID,
            'SkillId': skillId,
            'Level': level,
            'VerifierId': 136,
            // 'VerifierId': 111,
            'Username': 'diplomarbeit.arsr@gmail.com',
            'AutoConfirm': false,
            'Signature': ''
        }
        requestData['Signature'] = sha256(JSON.stringify(requestData) + signature);
        console.log("RequestData:", requestData)
        console.log("Signature:", requestData['Signature'])
        return axios.post(url, requestData, {
            headers: {
                "x-api-key": this.apiKey,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
    }
}