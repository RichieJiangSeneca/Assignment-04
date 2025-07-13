/********************************************************************************
*  WEB322 – Assignment 04
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Siyang Jiang Student ID: 172747230 Date: Jun 11 2025
*
*  Published URL: https://assignment-04-k0ez.onrender.com
*
********************************************************************************/

const express = require('express');
const path = require('path');
const app = express();

const projectData = require("./data/projectData.json");
const sectorData = require("./data/sectorData.json");

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home', { page: '/' }); 
});

app.get('/about', (req, res) => {
    res.render('about', { page: '/about' });
});

app.get('/solutions/projects', (req, res) => {
    let sector = req.query.sector;
    let filtered = projectData;

    if (sector) {
        let sectorObj = sectorData.find(s => s.sector_name.toLowerCase() === sector.toLowerCase());
        if (!sectorObj) {
            return res.status(404).render("404", { message: "No projects found for this sector." });
        }
        filtered = projectData.filter(project => project.sector_id === sectorObj.id);
        if (!filtered.length) {
            return res.status(404).render("404", { message: "No projects found for this sector." });
        }
    }
    res.render('projects', { projects: filtered, sectors: sectorData, page: '/solutions/projects' });
});

app.get('/solutions/projects/:id', (req, res) => {
    let project = projectData.find(project => project.id == req.params.id);
    if (!project) {
        return res.status(404).render("404", { message: "No project found with that ID." });
    }
    res.render('project', { project: project, page: '' }); 
});

app.use((req, res) => {
    res.status(404).render("404", { message: "I'm sorry, we're unable to find what you're looking for." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
