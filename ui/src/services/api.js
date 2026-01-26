// const API_BASE_URL = 'https://www.deepakpun.com/api/v1'
// const API_BASE_URL = 'http://localhost:3001/v1'

// const API_BASE_URL = import.meta.env.NODE_ENV === 'production'
//   ? import.meta.env.VITE_API_BASE_URL || 'https://www.deepakpun.com/api/v1'
//   : 'http://localhost:3001/v1';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.deepakpun.com/api/v1'
const API_KEY = import.meta.env.VITE_API_KEY || 'deepak-pun-2026-demo'

class ProjectsAPI {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        ...options.headers,
      },
      ...options,
    }

    try {
      console.log(`API Request: ${options.method || 'GET'} ${url}`)

      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json();
      console.log(`API Response for ${endpoint}:`, result)

      return result
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Helper to extract data from response
  extractData(response) {
    // Handle different response structures
    if (response.data !== undefined) {
      return response.data
    }
    if (response.result !== undefined) {
      return response.result
    }
    return response
  }

  // GET all projects
  async getProjects() {
    const response = await this.request('/projects');
    return this.extractData(response)
  }

  // GET single project by ID
  async getProject(projectId) {
    const response = await this.request(`/projects/${projectId}`)
    return this.extractData(response)
  }

  // POST create project
  async createProject(projectData) {
    const response = await this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    })
    return this.extractData(response)
  }

  // PUT update project
  async updateProject(projectId, projectData) {
    console.log(projectId, projectData)
    const response = await this.request(`/projects/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    })
    console.log(this.extractData(response))
    return this.extractData(response)
  }

  // DELETE project
  async deleteProject(projectId) {
    const response = await this.request(`/projects/${projectId}`, {
      method: 'DELETE',
    })
    return this.extractData(response)
  }
}

export default new ProjectsAPI()