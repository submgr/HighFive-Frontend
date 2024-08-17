import enrichResultsWithUserData from './enrichRequestsData';


async function getAllVolunteerRequestData(parent_this: any) {
    try {
        var networkError = false;
        const response = await parent_this.$axios.get(parent_this.$globaldata.api.hostname + 'access/volunteer/requests/catched', {
            params: {
                //params here
            }
        }).catch((error: any) => {
            // Handle error
            console.error(error); // Log or process the error
            networkError = true;
        });

        // Assuming response.data.result is the array of requests
        const results = response.data.result;

        // Process results if necessary. For example, map the results to match the expected structure
        // This step is optional and depends on the structure of your data
        const processedResults = results.map(request => ({
            id: request.id,
            owner: request.owner,
            owner_name: null, // Example, replace with actual logic to get owner name
            owner_avatar: null, // Example, replace with actual logic to get owner avatar
            assigned_volunteer: request.assigned_volunteer || "",
            volunteer_name: null, // Example, replace with actual logic
            volunteer_avatar: null, // Example, replace with actual logic
            status: request.status,
            notes: request.notes,
            subject: request.subject // Example, replace with actual logic to get subject
        }));

        //Update requestsToDisplay with the processed results

        if(networkError){
            return "NetworkError"
        }else{
            return await enrichResultsWithUserData(parent_this.$axios, parent_this.$globaldata, processedResults)
        }
        
    } catch (error) {
        console.error("Error fetching data from server:", error);
    }
}

async function getAvailableForVolunteerRequestData(parent_this: any) {
    try {
        var networkError = false;

        const response = await parent_this.$axios.get(parent_this.$globaldata.api.hostname + 'access/volunteer/requests/available', {
            params: {
                //params here
            }
        }).catch((error: any) => {
            // Handle error
            networkError = true;
            console.error(error); // Log or process the error
        });

        // Assuming response.data.result is the array of requests
        const results = response.data.result;

        // Process results if necessary. For example, map the results to match the expected structure
        // This step is optional and depends on the structure of your data
        const processedResults = results.map(request => ({
            id: request.id,
            owner: request.owner,
            owner_name: null, // Example, replace with actual logic to get owner name
            owner_avatar: null, // Example, replace with actual logic to get owner avatar
            assigned_volunteer: request.assigned_volunteer || "",
            volunteer_name: null, // Example, replace with actual logic
            volunteer_avatar: null, // Example, replace with actual logic
            status: request.status,
            notes: request.notes,
            subject: request.subject, // Example, replace with actual logic to get subject
            availableForCatch: true
        }));

        //Update requestsToDisplay with the processed results

        if(networkError){
            return "NetworkError"
        }else{
            return await enrichResultsWithUserData(parent_this.$axios, parent_this.$globaldata, processedResults)
        }
        
    } catch (error) {
        console.error("Error fetching data from server:", error);
    }
}

async function getAllOwnedRequestData(parent_this: any) {
    try {
        var networkError = false;
        const response = await parent_this.$axios.get(parent_this.$globaldata.api.hostname + 'access/requests/get_all', {
            params: {
                //params here
            }
        }).catch((error: any) => {
            // Handle error
            console.error(error); // Log or process the error
            networkError = true;
        });

        // Assuming response.data.result is the array of requests
        const results = response.data.result;

        // Process results if necessary. For example, map the results to match the expected structure
        // This step is optional and depends on the structure of your data
        const processedResults = results.map(request => ({
            id: request.id,
            owner: request.owner,
            owner_name: null, // Example, replace with actual logic to get owner name
            owner_avatar: null, // Example, replace with actual logic to get owner avatar
            assigned_volunteer: request.assigned_volunteer || "",
            volunteer_name: null, // Example, replace with actual logic
            volunteer_avatar: null, // Example, replace with actual logic
            status: request.status,
            notes: request.notes,
            subject: request.subject // Example, replace with actual logic to get subject
        }));

        //Update requestsToDisplay with the processed results

        if(networkError){
            return "NetworkError"
        }else{
            return await enrichResultsWithUserData(parent_this.$axios, parent_this.$globaldata, processedResults)
        }


        
    } catch (error) {
        console.error("Error fetching data from server:", error);
    }
}

async function getSingleRequest(parent_this: any, data: any = {}) {
    try {
        var response = null;
        var networkError = false;
        if(!data.isVolunteer){
            response = await parent_this.$axios.get(parent_this.$globaldata.api.hostname + 'access/requests/get', {
                params: {
                    request_id: parent_this.$route.params.id,
                    user_id: parent_this.$store.getters.getUserData
                }
            }).catch((error: any) => {
                // Handle error
                console.error(error); // Log or process the error
                networkError = true;
            });
        } else {
            response = await parent_this.$axios.get(parent_this.$globaldata.api.hostname + 'access/volunteer/requests/get', {
                params: {
                    request_id: parent_this.$route.params.id,
                    user_id: parent_this.$store.getters.getUserData
                }
            }).catch((error: any) => {
                // Handle error
                console.error(error); // Log or process the error
            });
        }
        

        // Assuming response.data.result is the array of requests
        const results = response.data.result;

        var requestData = results[0];
        requestData.id = parent_this.$route.params.id + '';
        console.log("Received the following request data:", requestData)
        
        if(networkError){
            return "NetworkError"
        }else{
            return requestData;
        }
    } catch (error) {
        console.error("Error fetching data from server:", error);
    }
}

export default getAllOwnedRequestData;
export  { getAllOwnedRequestData, getSingleRequest, getAllVolunteerRequestData, getAvailableForVolunteerRequestData };