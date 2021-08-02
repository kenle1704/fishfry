import axios from 'axios';
const API_URL = 'http://fishfry.com';
const API_PORT = '8080';
export default class ApiService{
	constructor(){}

	getBoats() {
        console.log("get boats");
		const url = `${API_URL}:${API_PORT}/api/boats/`;
		return axios.get(url).then(response => response.data);
	}

	getBoatsByURL(link){
		const url = `${API_URL}:${API_PORT}${link}`;
		return axios.get(url).then(response => response.data);
	}

	getBoat(pk) {
		const url = `${API_URL}:${API_PORT}/api/boats/${pk}`;
		return axios.get(url).then(response => response.data);
	}

	deleteBoat(boat){
		const url = `${API_URL}:${API_PORT}/api/boats/${boat.pk}`;
		return axios.delete(url);
	}

	createBoat(boat){
		const url = `${API_URL}:${API_PORT}/api/boats/`;
		return axios.post(url,boat);
	}

	updateBoat(boat){
		const url = `${API_URL}:${API_PORT}/api/boats/${boat.pk}`;
		return axios.put(url,boat);
	}
	// guide api 
	getGuides() {
        console.log("get guides");
                const url = `${API_URL}:${API_PORT}/api/guides/`;
                return axios.get(url).then(response => response.data);
        }

        getGuidesByURL(link){
                const url = `${API_URL}:${API_PORT}${link}`;
                return axios.get(url).then(response => response.data);
        }

        getGuide(pk) {
                const url = `${API_URL}:${API_PORT}/api/guides/${pk}`;
                return axios.get(url).then(response => response.data);
        }

        deleteGuide(guide){
                const url = `${API_URL}:${API_PORT}/api/guides/${guide.pk}`;
                return axios.delete(url);
        }

        createGuide(guide){
                const url = `${API_URL}:${API_PORT}/api/guides/`;
                return axios.post(url,guide);
        }

        updateGuide(guide){
                const url = `${API_URL}:${API_PORT}/api/guides/${guide.pk}`;
                return axios.put(url,guide);
        }
	// swimlane api
			getSwimLanes() {
        console.log("get swimlanes");
                const url = `${API_URL}:${API_PORT}/api/swimlanes/`;
                return axios.get(url).then(response => response.data);
        }

        getSwimLanesByURL(link){
                const url = `${API_URL}:${API_PORT}${link}`;
                return axios.get(url).then(response => response.data);
        }

        getSwimLane(pk) {
                const url = `${API_URL}:${API_PORT}/api/swimlanes/${pk}`;
                return axios.get(url).then(response => response.data);
        }

        deleteSwimLane(swimlane){
                const url = `${API_URL}:${API_PORT}/api/swimlanes/${swimlane.pk}`;
                return axios.delete(url);
        }

        createSwimLane(swimlane){
                const url = `${API_URL}:${API_PORT}/api/swimlanes/`;
                return axios.post(url,swimlane);
        }

        updateSwimLane(swimlane){
                const url = `${API_URL}:${API_PORT}/api/swimlanes/${swimlane.pk}`;
                return axios.put(url,swimlane);
        }
	// boat service api
	getBoatServices() {
        	console.log("get boatservice");
                const url = `${API_URL}:${API_PORT}/api/boatservice/`;
                return axios.get(url).then(response => response.data);
        }

        getBoatServicesByURL(link){
                const url = `${API_URL}:${API_PORT}${link}`;
                return axios.get(url).then(response => response.data);
        }

        getBoatService(pk) {
                const url = `${API_URL}:${API_PORT}/api/boatservice/${pk}`;
                return axios.get(url).then(response => response.data);
        }

        deleteBoatService(boatservice){
                const url = `${API_URL}:${API_PORT}/api/boatservice/${boatservice.pk}`;
                return axios.delete(url);
        }

        createBoatService(boatservice){
                const url = `${API_URL}:${API_PORT}/api/boatservice/`;
                return axios.post(url,boatservice);
        }

        updateBoatService(boatservice){
                const url = `${API_URL}:${API_PORT}/api/boatservice/${boatservice.pk}`;
                return axios.put(url,boatservice);
        }
}
