const ApiService = {
    async getAllTodos(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                const errorData = await response.json();
                return { error: errorData.error || response.statusText };
            }
            if (response.status === 200) {
                const todos = await response.json();
                return todos;
            }
        } catch (error) {
            return { error: 'Network error: ' + error.message };
        }
    },

    async getTodoById(url, id) {
        try {
            const response = await fetch(`${url}/${id}`);
            if (!response.ok) {
                const errorData = await response.json();
                return { error: errorData.error || response.statusText };
            }
            if (response.status === 200) {
                const todo = await response.json();
                return todo;
            }
        } catch (error) {
            return { error: 'Network error: ' + error.message };
        }
    },

    async createTodo(url, data) {
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
            if (response.status === 201) {
                const todo = await response.json();
                return todo;
            }
        } catch (error) {
            return { error: 'Network error: ' + error.message };
        }
    },

    async updateTodo(url, id, data) {
        try {
            const response = await fetch(`${url}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                const errorData = await response.json();
                return { error: errorData.error || response.statusText };
            }
            if (response.status === 204) {
                return { success: true };
            }

        } catch (error) {
            return { error: 'Network error: ' + error.message };
        }
    },

    async deleteTodo(url, id) {
        try {
            const response = await fetch(`${url}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                return { error: errorData.error || response.statusText };
            }
            if (response.status === 204) {
                return { success: true };
            }
        } catch (error) {
            return { error: 'Network error: ' + error.message };
        }
    }
};

export default ApiService;