const DataHandler = {

    async saveUserData(userData) {
        try {
            const response = await fetch("/api/saveUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Ersror("Failed to save user data");
            }

            const data = await response.json();
            return data;
        } catch (error) {
           
            throw new Error("Failed to save user data");
        }
    }
};

export default DataHandler;
