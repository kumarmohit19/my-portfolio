const CLIENT_ID = 'af5c196f5b39afbb8e82'
const CLIENT_SECRET = '5a8d8046fa635b4365e8c47e75b841dbffb25d59'
const username = 'kumarmohit19'

const projectsEl = document.querySelector('.projects')

const javaProjectPNG = 'java_project'

let projects = []

const updatePage = () => {
  const projectsHTML = projects.map(
    (project) =>
      `<div class="item">
        <a href=${getProjectURl(project.homepage)} target="_blank">
          <img src=${getProjectImage(
            project.language,
            project.name
          )} onerror="this.src='img/projects/fallback.png'" alt=${project.name}>
        </a>
        <a href=${project.homepage} class="btn-light" target="_blank">
          <i class="fas fa-eye"></i> ${project.name}
        </a>
        <a href=${project.html_url} class="btn-dark" target="_blank">
          <i class="fab fa-github"></i> Github
        </a>
      </div>`
  )

  console.log(projectsHTML.join(''))

  projectsEl.innerHTML = projectsHTML.join('')
}

const fetchMyProject = async () => {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=created:asc&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
  )

  const data = await res.json()

  projects = data

  console.log(projects)
  updatePage()
}

fetchMyProject()

const getProjectImage = (projectLang, projectName) => {
  if (
    projectLang !== null &&
    projectLang.includes('Java', 'JAVA') &&
    projectLang.length === 4
  )
    return `img/projects/${javaProjectPNG}.png`
  return `img/projects/${projectName}.png`
}

const getProjectURl = (projectURL) => {
  if (projectURL === null) return '#!'
  return projectURL
}
