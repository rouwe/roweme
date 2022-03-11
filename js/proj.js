class createProject {
    // Template for building project instance.
    constructor(projectObj) {
        this.preview = projectObj['preview'];
        this.code = projectObj['code'];
        this.demo = projectObj['demo'];
        this.brand = projectObj['brand'];
        this.catchPhrase = projectObj['catchPhrase'];
        this.description = projectObj['description'];
        this.technologies = projectObj['technologies'];
    }
    // Create empty container.
    createProjectContainer(parentId=null, parent) {
        /* 
        * @param parentId: string - (id selector) where the project container to be appended.
        * @return container: object - created <div> element.
        */
       const projectContainerTag = 'div';
       const container = document.createElement(projectContainerTag);
        if (parentId !== null) {
            const parentElement = document.getElementById(parentId);
            parentElement.appendChild(container);
        } else {
            parent.appendChild(container);
        }
        return container;
    }
    // Add element attribute(s).
    addAttribute(attributesObj, element) {
        /* 
        * @param attributesObj: object - contains the attributes name and value.
        * @param element: string - (id selector) where the project container needs to be appended.
        */
        for (const attrKey in attributesObj) {
            let attrValue = attributesObj[attrKey]; 
            element.setAttribute(attrKey, attrValue);
        }
    }
    // Create preview element.
    createPreview(parent) {
        /* 
        * @param parent: object - selected parent where the preview element needs to be appended.
        * @return previewImg: object - the created <img> element.
        */
        const previewTag = 'img';
        const previewImg = document.createElement(previewTag);
        parent.appendChild(previewImg);
        return previewImg;
    }
    // Create cta button for (code or demo).
    createDemoCta(ctaObj, parent) {
        /* 
        * @param ctaObj: object - contains the name('code' or 'demo'), status, href.
        * @param parent: object - (id selector) where the project container needs to be appended & source code Availability
        * @return cta: object - the created <a> element.
        */
        const ctaTag = 'a';
        const cta = document.createElement(ctaTag);
        const ctaName = ctaObj['name'];
        cta.textContent = ctaName;
        parent.appendChild(cta);
        return cta;
    }
    // Create project title with (brand & catchphrase).
    createProjectTitle(brandObj, parent) {
        /*
        * @param brandObj: object - contains the title, and catchphrase of the project.
        * @param parent: object - selected parent where the preview element needs to be appended.
        * @return projectTitleElement: object - created <h2> element.
        */
        const brandName = brandObj['brand'], catchPhrase = brandObj['catchPhrase'];
        const formatBrandName = `${brandName[0].toUpperCase()}${brandName.slice(1,)}`;
        const formatCatchPhrase = catchPhrase.split(' ').map((word) => `${word[0].toUpperCase()}${word.slice(1,)}`).join(' ');
        const projectTitleTextNode = document.createTextNode(`${formatBrandName} - ${formatCatchPhrase}`);
        const projectTitleElement = document.createElement("h2");
        projectTitleElement.appendChild(projectTitleTextNode);
        parent.appendChild(projectTitleElement);
        return projectTitleElement;
    }
    // Create description
    createDescription(descriptionText, parent) {
        /*
        * @param descriptionText: string - text node value for description.
        * @param parent: object - selected parent where the description needs to be appended.
        * @return description: object - the created <p> element.
        */
       const description = document.createElement('p');
       const descriptionTextNode = document.createTextNode(descriptionText);
       description.appendChild(descriptionTextNode);
       parent.appendChild(description);
       return description;
    }
    // Create divider
    createDetailsDivider(parent) {
        /*
        * @param parent: object - selected parent where the divider element needs to be appended.
        * @return divider: object - the created <hr> element.
        */
       const divider = document.createElement('hr');
       parent.appendChild(divider);
       return divider;
    }
    // Create technologies tag heading
    createTechnologiesHeading(parent) {
        /*
        * @param parent: object - selected parent where the technologies heading element needs to be appended.
        * @return headingElement: object - the created <h2> element.
        */
        const headingTextNode = document.createTextNode('Technologies');
        const headingElement = document.createElement('h3');
        headingElement.appendChild(headingTextNode);
        parent.appendChild(headingElement);
        return headingElement;
    }
    // Create technologies tag
    createTechnologiesTag(technologiesArray, parent) {
        /*
        * @param technologiesArray: array - collection of technology used.
        * @param parent: object - selected parent where the divider element needs to be appended.
        * @return tagElementsDetailArray: array - an array of object where each object contains the tag container (<div>) and tag text (<span>) objects.
        */
        let tagElementsDetailArray = [];
        for (const technology of technologiesArray) {
            const tagContainer = document.createElement('div');
            const tagTextNode = document.createTextNode(technology);
            const tagSpanElement = document.createElement('span');
            tagSpanElement.appendChild(tagTextNode);
            tagContainer.appendChild(tagSpanElement);
            tagSpanElement.setAttribute('class', 'technologies-tag');
            tagContainer.setAttribute('class', 'technologies-tag-box');
            parent.appendChild(tagContainer);
            const tagElementsDetail = {
                div: tagContainer,
                span: tagSpanElement
            }
            tagElementsDetailArray.push(tagElementsDetail);
        }
    }
}
(function startProjectRendering() {
    // Fetch
    fetch('./js/data.json')
    .then((response) => response.json())
    .then((data) => {
        const projectsArray = data['projects'];
        const parentId = 'container';

        // Start rendering
        // Iterate through all projects
        for (const project of projectsArray) {
            // Project component instance
            let newProject = new createProject(project);
            const projectBrand = newProject['brand'];            
            // Project Container
            const projectContainer = newProject.createProjectContainer(parentId);
            newProject.addAttribute({
                id: newProject['brand'],
                class: 'project-container'
            }, projectContainer);
            // Preview Box
            const previewContainer = newProject.createProjectContainer(null, projectContainer);
            newProject.addAttribute({class: 'preview-box'}, previewContainer);
            const previewImg = newProject.createPreview(previewContainer); // Screenshot
            newProject.addAttribute({
                class: 'preview-img',
                src: newProject['preview']['src'],
                alt: newProject['preview']['alt']
            }, previewImg);
            // Preview Cta Box
            const previewCtaContainer = newProject.createProjectContainer(null, previewContainer);
            newProject.addAttribute({class: 'preview-cta-box'}, previewCtaContainer);
            const ctaArray = [newProject['code'], newProject['demo']]; // code & demo cta
            for (const cta of ctaArray) {
                const currentCta = newProject.createDemoCta(cta, previewContainer); // Current cta
                const ctaName = cta['name'];
                const ctaClass = 'cta-' + ctaName;
                const ctaURL = cta['href'];
                newProject.addAttribute({class: ctaClass}, currentCta);
                if (ctaName == 'code') newProject.addAttribute({href: ctaURL}, currentCta);
                else if (ctaName == 'demo') newProject.addAttribute({href: ctaURL + '?project_demo=' + projectBrand}, currentCta);
                previewCtaContainer.appendChild(currentCta);
            }
            // Project Details Box
            const detailsContainer = newProject.createProjectContainer(null, projectContainer);
            newProject.addAttribute({class: 'details-box'}, detailsContainer);
            // Project Texts (Title, catchphrase, and description)
            const detailsText = newProject.createProjectContainer(null, detailsContainer);
            newProject.addAttribute({class: 'details-text'}, detailsText);
            const projectTitle = newProject.createProjectTitle({
                brand: projectBrand,
                catchPhrase: newProject['catchPhrase']
            }, detailsText);
            newProject.addAttribute({class: 'details-title'}, projectTitle);
            const detailsDescription = newProject.createDescription(newProject['description'], detailsText);
            newProject.addAttribute({class: 'details-description'}, detailsDescription);
            // Details divider
            const detailsDivider = newProject.createDetailsDivider(detailsContainer);
            newProject.addAttribute({class: 'details-divider'}, detailsDivider); 
            // Technologies Box
            const technologiesContainer = newProject.createProjectContainer(null, detailsContainer);
            newProject.addAttribute({class: 'details-technologies-box'}, technologiesContainer);
            const technologiesHeading = newProject.createTechnologiesHeading(technologiesContainer);
            newProject.addAttribute({class: 'details-technologies-heading'}, technologiesHeading);
            const technologiesTags = newProject.createTechnologiesTag(newProject['technologies'], technologiesContainer);
        }    
    })
})();