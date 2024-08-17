async function enrichResultsWithUserData(axios, globaldata, results) {
    // Step 1: Extract unique IDs
    const uniqueIds = [...new Set(results.flatMap(request => [request.owner, request.assigned_volunteer].filter(Boolean)))];

    console.log('Unique IDs:', uniqueIds)
    // Step 2: Prepare data for request (already done by collecting unique IDs)

    // Step 3: Make a server request
    try {
        const response = await axios.post(globaldata.api.hostname + 'access/user/fetchUsers', {
            ids: uniqueIds, // Replace with uniqueIds
        });
        // Continue with your response handling

        const usersInfo = response.data.results; // Assuming this is an array of {id, name, avatar}

        console.log('Users info:', usersInfo)

        // Step 4: Process server response
        const userInfoMap = new Map(usersInfo.map(user => [user.id, user]));

        // Assuming results is an array of objects with owner and assigned_volunteer fields
        // And usersInfo is as described

        results.forEach(result => {
            // Find the owner in usersInfo
            const ownerInfo = usersInfo.find(user => user.id + "" === result.owner + "");
            if (ownerInfo) {
                // Update owner_name and owner_avatar if owner is found
                result.owner_name = ownerInfo.name;
                result.owner_avatar = ownerInfo.avatar;
            }

            // Find the assigned_volunteer in usersInfo
            const volunteerInfo = usersInfo.find(user => user.id + "" === result.assigned_volunteer + "");
            if (volunteerInfo) {
                // Update volunteer_name and volunteer_avatar if assigned_volunteer is found
                result.volunteer_name = volunteerInfo.name;
                result.volunteer_avatar = volunteerInfo.avatar;
            }
        });

        console.log("Results after they were populated with additional information (1): ", results); // Updated results

        var processedResults = results;

        return processedResults;
    } catch (error) {
        console.error('Failed to fetch user info:', error);
        // Handle error appropriately
        return results; // Return unmodified results in case of error
    }
}

export default enrichResultsWithUserData;