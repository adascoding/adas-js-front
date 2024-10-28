const AuthService = {
    async login(url) {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                const errorData = await response.json();
                return { error: errorData.error || response.statusText };
            }
            if (response.status === 200) {
                const results = await response.json();
                return results;
            }
        } catch (error) {
            return { error: 'Network error: ' + error.message };
        }
    },

    async register(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return { error: errorData.error || response.statusText };
            }

            if (response.status === 200) {
                return { success: true };
            }

        } catch (error) {
            return { error: 'Network error: ' + error.message };
        }
    },
};

export default AuthService;
