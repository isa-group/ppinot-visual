# ***VISUAL PPINOT***

### About
VISUAL PPINOT is a graphical notation for defining PPIs together with business process models.  Its underlying formal metamodel allows the automated processing of PPIs. Furthermore, it improves current state-of-the-art proposals in terms of expressiveness and in terms of providing an explicit visualisation of the link between PPIs and business processes, which avoids inconsistencies and promotes their co-evolution. VISUAL PPINOT can be integrated with Business Process Model Notation (BPMN). If you want to know more information about VISUAL PPINOT, click on this link https://link.springer.com/article/10.1007/s12599-017-0483-3.

In this repository, BPMN io (https://github.com/bpmn-io) has been extended to implement VISUAL PPINOT.



### Building
To use this editor, you must follow these steps:
1. Install Visual Studio Code first (https://code.visualstudio.com/)
2. Download NodeJS (https://nodejs.org/es/)
3. Download this project 
4. Execute in a Visual Studio Code console the following command to install all required project dependencies:
"npm install"
5. Execute in a Visual Studio Code console the following command to spin up the test interactively in the browser:
"npm run dev"
6. Then a tab will open in your browser with the editor, but in case it doesn't open, visit http://localhost:9000/


### How to extend VISUAL PPINOT:
If you want to extend VISUAL PPINOT, you will have to modify some files depending on what you want to change (in each section there is an explained example):

New icons:
  - index.html: if you want to add new icons to the editor, you will have to code a svg image to ready for css using this conversor https://yoksel.github.io/url-encoder/

  - PPINOTPalette.js: if you want to add these icons to the palette you will have to assing new icons to the editor palette, you will to assign the icons of the index.html to a certain object.

Buttons in sub palette of an object:
  - PPINOTContextPadProvider: if you want to modify or add an icon to the sub palette of an object, you will to have to add it here. These buttons could be for elements and connectors.

