    // ------------------------ Fancy Terminal Animations ---------------------------------------------------------------------  
    const lines = [
        "Alaya Vijnana System [Version 1.4.0]",
        "[ERROR] - (PARIAH OS::config::kernel): 0xFa659bcd seg fault",
        "[ERROR] - (PARIAH OS::config::syscall): 0xDf85646a inaccessible",
        "[WARN] - (PARIAH OS::config::run): MANUAL OVERRIDE INITIATED",
        "ASW-G-08:-[Name Redacted]",
        "Type 'help' to see available commands."
    ];

    const foot = 
        `<h4 style="color: red;">
         Belief will not save us <br>
         Lies will not protect us <br>
         But it is our hope that will damn us <br>
         Copyright &copy; Min Htut Myat All rights reserved
         </h4>`;

    const promptParts = [
        { class: "user", text: "ghoulss", style: { color: "green" } },
        { text: "@", style: { color: "green", fontWeight: "bold" } },
        { text: "PariahOS", style: { color: "purple" } },
        { class: "dir", text: ":/home/ghoulss>", style: {color: "yellow"} }
    ];

    const elements = [
        document.getElementById("anim"),
        document.getElementById("anim2"),
        document.getElementById("anim3"),
        document.getElementById("anim4"),
        document.getElementById("anim5"),
        document.getElementById("anim6")
    ];

    async function typewriter(text, element, delay = 40) {
        for (let i = 0; i < text.length; i++) {
            element.textContent += text[i];
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    async function showLine(text, element, delay = 500) {
        element.textContent = text;
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    async function showfootcontent(htmlcontent, delay = 500) {
        document.querySelector(".foot").innerHTML = htmlcontent;
        await new Promise(resolve => setTimeout(resolve, delay));
    }


    async function animateLines(lines, elements, delayBetweenLines = 500) {
        for (let i = 0; i < lines.length; i++) {
            if (elements[i].id === "anim2" || elements[i].id === "anim3")
            {
                await showLine(lines[i], elements[i], 300);
            }
            else if (elements[i].id === "anim4" || elements[i].id === "anim5" || elements[i].id === "anim6")
            {
                await showLine(lines[i], elements[i], 1000);
            }
            else
            {
                await typewriter(lines[i], elements[i]);
                await new Promise(resolve => setTimeout(resolve, delayBetweenLines));
            }
        }
    }
    
    const promptElement = document.getElementById("prompt");
    const cursorElement = document.getElementById("cmd1");
    
    async function showInputAfterPrompt() {
        await new Promise(resolve => setTimeout(resolve, 500)); 
        cursorElement.style.visibility = "visible"; 
    }
    

    function displayPrompt(element, parts) {
        element.innerHTML = ""; 
        parts.forEach(part => {
            const span = document.createElement("span");
            span.textContent = part.text; 
            Object.assign(span.style, part.style); 
            span.classList.add(part.class);
            element.appendChild(span); 
        });
    }

    // ----------------------------------------- Command line functionalities --------------------------------------------------------------------------

    // input control
    let input = "";

    // for actual commands, not "enter"
    let acmdhistory = [];
    let ahistoryindex = -1;
    let acmdcounter = 1;

    let cmdCounter = 1;
    let cmdhistory = []
    let historyindex = -1;
    let isError = false;
    let currentdir = localStorage.getItem("current_directory");
    let currentuser = localStorage.getItem("current_user");
    console.log(currentdir +" "+ currentuser);

    function cmdcaller (event)
    {
        const outputsection = document.querySelector(".output");
        input = document.getElementById(`cmd${cmdCounter}`);

        // Handle "enter" command entering
        if(event.keyCode === 13) {

            // Better coding practice, input.value is bad practice as .value is not guaranteed
            const cmdinput = document.getElementById(`cmd${cmdCounter}`).value.trim().toLowerCase();

            let coutput = '';

            // Maintain history of commands for terminal like behavior after typing commands
            if (cmdinput)
            {
                cmdhistory.push(cmdinput);
                console.log(cmdhistory);
                historyindex = cmdhistory.length;
            }
            
            // Keep history of commands except for "enter" key
            if (cmdinput !== "" && cmdinput !== "clear")
            {
                acmdhistory.push(cmdinput);
                console.log("Actual: " + acmdhistory);
                ahistoryindex = acmdhistory.length;
            }

            switch (cmdinput.split(" ")[0].trim()){
                case "whoami":
                    isError = false;
                    coutput = currentuser;
                    break;
                case "bio":
                    isError = false;
                    coutput = `Hi, I am Min and I have a strong passion in CyberSecurity.`;
                    break;
                case "":
                    cmdhistory.push(" ");
                    isError = false;
                    coutput = " ";
                    break;
                case "certs":
                    isError = false;
                    coutput = `
                    EC-Council - Certified Ethical Hacker (CEHv9) <br/>
                    EC-Council - Computer Hacking Forensic Investigator (CHFIv9)
                    `;
                    break;
                case "pwd":
                    isError = false;
                    coutput = currentdir.slice(1,currentdir.length - 1);
                    break;
                case "cd":
                    const cinput = cmdinput.split(" ")[1];

                    if (!cinput)
                    {
                        isError = true;
                        coutput = `Error: Directory Required`;
                    }
                    else if (cinput === "/root" && currentuser === "root")
                    {
                        isError = false;
                        localStorage.setItem("current_directory", ":/root>");
                        currentdir = localStorage.getItem("current_directory");
                        coutput = ``;
                    }
                    else
                    {
                        isError = true;
                        coutput = `Error: Permission Denied.`;
                    }
                    break;
                case "clear":
                    isError = false;
                    console.log(localStorage.getItem("current_user") + " " + currentuser);
                    let cmdpmpt = `<span id="prompt"><span class="user" style="color: green;">${currentuser}</span><span style="color: green; font-weight: bold;">@</span><span style="color: purple;">PariahOS</span><span class="dir" style="color: yellow">${currentdir}</span></span>`;
                    coutput = `${cmdpmpt}`;
                    cmdCounter = 1;
                    break;
                case "echo":
                    const einput = cmdinput.split(" ")[1];

                    if (!einput)
                    {
                        isError = false;
                        coutput = ``;
                    }
                    else
                    {
                        isError = false;
                        coutput = `${einput}`
                    }
                    break;
                case "exit":
                    isError = false;
                    localStorage.setItem("current_user", "ghoulss");
                    currentuser = localStorage.getItem("current_user");
                    localStorage.setItem("current_directory", ":/home/ghoulss");
                    currentdir = localStorage.getItem("current_directory");

                    document.getElementById("anim5").innerHTML = "ASW-G-08:-[Name Redacted]";
                    
                    break;
                case "sudo":
                    isError = false;
                    localStorage.setItem("current_user", "root");
                    currentuser = localStorage.getItem("current_user");

                    if (document.getElementById("anim2") && document.getElementById("anim3") && document.getElementById("anim4"))
                    {
                        document.getElementById("anim2").style.color = "white";
                        document.getElementById("anim2").innerHTML = "ALIAS \"V1D8R\"";
                        document.getElementById("anim3").style.color = "yellow";
                        document.getElementById("anim3").innerHTML = "[WARN] - OVERRIDE called, partial corruption at 0xFE673d2a3 suspected";
                        document.getElementById("anim4").style.color = "white";
                        document.getElementById("anim4").innerHTML = "//: Kernel Operations - NORMAL ";
                    }

                    document.getElementById("anim5").innerHTML = "ASW-G-08:-Gundam Barbatos Lupus Rex";

                    coutput = ``;
                    break;
                case "stats":

                    const sflag = cmdinput.split(" ")[1];

                    if (!sflag)
                    {
                        isError = false;
                        coutput = `
                        <table style={{width: '100%'}}>
                            <tbody>
                            <tr>
                                <td>Class: FIGHTER</td>
                            </tr>
                            <tr>
                                <td>Intelligence:</td>
                                <td>[--------------]</td>
                            </tr>
                            <tr>
                                <td>Attack Power:</td>
                                <td>[--------------------]</td>
                            </tr>
                            <tr>
                                <td>Stamina:</td>
                                <td>[------------]</td>
                            </tr>
                            <tr>
                                <td>Adaptability:</td>
                                <td>[--------]</td>
                            </tr>
                            <tr>
                                <td>Resilience:</td>
                                <td>[------------]</td>
                            </tr>
                            </tbody>
                        </table>
                        `;
                    }
                    else if (sflag === "-a")
                    {
                        isError = false;
                        coutput = `
                        <table style={{width: '100%'}}>
                            <tbody>
                            <tr>
                                <td>CLASS: FIGHTER</td>
                            </tr>
                            <tr>
                                <td>Intelligence:</td>
                                <td>[--------------]</td>
                            </tr>
                            <tr>
                                <td>Attack Power:</td>
                                <td>[--------------------]</td>
                            </tr>
                            <tr>
                                <td>Stamina:</td>
                                <td>[------------]</td>
                            </tr>
                            <tr>
                                <td>Adaptability:</td>
                                <td>[--------]</td>
                            </tr>
                            <tr>
                                <td>Resilience:</td>
                                <td>[------------]</td>
                            </tr>
                            <tr>
                                <td></td>
                            </tr>
                            <tr>
                                <td>BUFFS:</td>
                            </tr>
                            <tr>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Sandevic Haste: </td>
                                <td>+20% Speed <br> -35% Accuracy</td>
                            </tr>
                            <tr>
                                <td>Neuromantic Focus: </td>
                                <td>+170% Crit Damage <br> +50% Crit Chance</td>
                            </tr>
                            </tbody>
                        </table>
                        `;
                    }
                    else
                    {
                        isError = true;
                        coutput = `Error: Invalid Flag <br/>
                                   Check "help -all" to see the available flags`;
                    }
                    break;
                case "cat":

                    const cfile = cmdinput.split(" ")[1];

                    if (!cfile){
                        isError = true;
                        coutput = `Error: File required`;
                    }
                    else if (cfile === "about.md")
                    {
                        isError = false;
                        coutput = `
                        Hi, I am Min and I am a driven and passionate master's student at the University of Sydney. I have previously studied Bachelor of Computer <br/>
                        Science at the University of Wollongong and a Diploma of Information Technology at Nanyang Polytechnic. I find myself completely changed after <br/>
                        discovering my passion for technology (especially CyberSecurity) as I developed an insatiable hunger to broaden my skillsets in both software <br/>
                        and hardware. At times, I found myself wanting more and more as I found myself embracing challenges to test my mettle.
                        `
                    }
                    else if (cfile === "experience.md")
                    {
                        isError = false;
                        coutput = `
                        For my mandatory internship as per Nanyang Polytechnic's Diploma in Information Technology curriculum, I am attached to ST2 Human Resource and <br/>
                        Shared Services Department. I am tasked to do Robotic Process Automation (RPA) using UiPath which is used to implement and test scripts for RPA. <br/>
                        RPA is used for common business processes which are repetitive in nature and not feasible to be done by a human. RPA helps to automate these <br/>
                        processes and save precious resources such as time. <br/>
                        <br/>
                        Tasks as a Programmer Analyst: <br/>
                        <br/>
                        - Develop, test and implement RPA scripts using UiPath studios <br/>
                        <br/>
                        - Perform maintenance and debugging of existing scripts in the event of errors <br/>
                        <br/>
                        - Program in Excel VBA macro for automation of MS Excel spreadsheet processes <br/>
                        <br/>
                        - Program in Visual Basic when developing RPA scripts <br/>
                        `
                    }
                    else if (cfile === "projects.md")
                    {
                        isError = false;
                        coutput = `
                        <a href="https://github.com/Gh0ULSS/SocialStoriesFrontend" target="_blank">Sunset Stories</a> <br/>
                        <br/>
                        Adaptive Social Stories is designed to promote inclusivity in neurodiversity. The main focus is on special needs children to assist with <br/>
                        learning of mannerisms, self-improvement, social skills, success and various other topics/areas which serves as a foundation when the child <br/>
                        grows older. The Web Application developed with React, ASP.NET Core 6 supported by Entity Framework <br/>
                        and Filebase which is S3 compatible object storage for storing of images. <br/>
                        <br/>
                        <a href="https://github.com/Gh0ULSS/CSIT314-Project" target="_blank">Tradies Projects</a> <br/>
                        <br/>
                        Linking tradies with clients with location features. A Web application developed using the MERN Stack (MySQL, Express, React and Node). <br/>
                        <br/>
                        <a href="https://github.com/Gh0ULSS/File-System" target="_blank">Secure FileSystem</a> <br/>
                        <br/>
                        A simulated file system written in C++, leveraging the MD5 algorithm for security and system security principles such as Bell-la-Padula Model <br/>
                        and Biba Model. <br/>
                        <br/>
                        <a href="https://github.com/Gh0ULSS/Smallest-Triangle" target="_blank">Smallest Triangle</a> <br/>
                        A program written in C to find the smallest triangle from a set of randomly generated cartesian coordinates. <br/>
                        <br/>
                        <a href="https://github.com/Gh0ULSS/CPP-Robot-Building" target="_blank">Illawara Toy Robotics</a> <br/>
                        A program written in C++ to simulate building of robots for customers by various builders. <br/>
                        `
                    }
                    else if (cfile === "achievements.md")
                    {
                        isError = false;
                        coutput = `
                        CSIT321 Capstone Project - Top 5 Projects <br/>
                        <br/>
                        IT1201 Computing Mathematics 2 - Distinction <br/>
                        <br/>
                        IT2118 Infosecurity Technology - Distinction <br/>
                        <br/>
                        `
                    }
                    else if (cfile === "lessons.md" && currentdir === ":/root>")
                    {
                    
                        isError = false;
                        coutput = `
                        Do not assume anything.<br/>
                        <br/>
                        Putting pride and personal glory above duty and everything else is a precursor to a downfall that is to come.<br/>
                        <br/>
                        In CS, CyberSecurity and Data Science, University rankings means nothing, only the relevance to the industry<br/> 
                        and how up to date the courses are truly matters.<br/>
                        <br/>
                        The path to redemption is never straightforward.<br/>
                        <br/>
                        -----------------------------------------------------------------------------------------------------------------<br/>
                        <br/>
                        You can't judge one's victory if you haven't seen him defeated.<br/>
                        - Ali Husnain<br/>
                        <br/>
                        If you are choosing obstacles then they are not obstacles.<br/>
                        - Ali Husnain<br/>
                        <br/>
                        It's not the comfort but the comfort in hardship.<br/>
                        - Ali Husnain
                        `
                    }
                    else
                    {
                        isError = true;
                        coutput = `Error: File does not exist`;
                    }
                    break;
                case "skills":
                    isError = false;
                    coutput = `
                    ------ Programming Languages ------<br/>
                    Java<br/>
                    C#<br/>
                    Python<br/>
                    C++<br/>
                    Kotlin<br/>
                    <br/>
                    ------ Web Development and Web Frameworks ------<br/>
                    HTML<br/>
                    CSS<br/>
                    JavaScript<br/>
                    ASP.NET<br/>
                    Node JS<br/>
                    React.js<br/>
                    Express.js<br/>
                    <br/>
                    ------ Databases ------<br/>
                    MySQL<br/>
                    SQLite<br/>
                    <br/>
                    ------ Operating Systems ------<br/>
                    Windows<br/>
                    Ubuntu<br/>
                    Kali Linux<br/>
                    <br/>
                    ------ Miscellaneous Skills (Beginner Proficiency) ------- <br/>
                    Amazon Web Services (AWS) <br/>
                    Microsoft Azure <br/>
                    Docker <br/>
                    Burpsuite <br/>
                    Metasploit <br/>
                    PFSense <br/>
                    <br/>
                    `;
                    break;
                case "help":

                    const hflag = cmdinput.split(" ")[1];

                    if (!hflag)
                    {
                        isError = false;
                        coutput = `
                        Available commands: <br>
                        <br>
                        whoami <br>
                        pwd <br>
                        cat [filename] <br>
                        echo [args] <br>
                        bio <br>
                        skills <br>
                        stats <br>
                        uname <br>
                        ls <br>
                        lshw <br>
                        certs <br>
                        cd <br>
                        sudo <br>
                        exit <br>
                        <br>
                        Try "help -all" for more detailed list of commands`;
                    }
                    else if (hflag === "-all")
                    {
                        isError = false;
                        coutput = `
                        Available commands: <br>
                        <br>
                        whoami <br>
                        pwd <br>
                        cat [filename] <br>
                        echo [args] <br>
                        bio <br>
                        skills <br>
                        stats <br>
                        &nbsp;&nbsp;&nbsp;&nbsp; -a all <br/>
                        uname <br>
                        &nbsp;&nbsp;&nbsp;&nbsp; -a all <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp; -r kernel release <br/>
                        ls <br>
                        &nbsp;&nbsp;&nbsp;&nbsp; -l more verbose <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp; -lh more verbose and human-readable <br/>
                        lshw <br>
                        &nbsp;&nbsp;&nbsp;&nbsp; -a all <br/>
                        certs <br>
                        cd <br>
                        sudo <br>
                        exit <br>
                        `;
                    }
                    else
                    {
                       isError = true;
                       coutput = `Error: Invalid Flag <br/>
                                  Check "help -all" to see the available flags`;
                    }
                    break;
                case "ls":

                    const lflag = cmdinput.split(" ")[1];

                    if (!lflag)
                    {
                        isError = false;
                        if (currentdir === ":/root>")
                        {
                            coutput = `Lessons.md`;
                        }
                        else
                        {
                            coutput = `About.md Experience.md Projects.md Achievements.md`;
                        }
                    }
                    else if (lflag === "-l")
                    {
                        isError = false;
                        if (currentdir === ":/root>")
                        {
                            coutput = `
                            drwxr-xr-x 43 root root 534 Nov 24 2024 Lessons.md
                            `;
                        }
                        else
                        {
                            coutput = `
                            drwxr-xr-x 43 ghoulss ghoulss 234  Nov 24 2024 About.md <br/>
                            drwxr-xr-x  6 ghoulss ghoulss 1420 Nov 24 2024 Experience.md <br/>
                            drwxr-xr-x 12 ghoulss ghoulss 1652 Nov 25 2024 Projects.md <br/>
                            drwxr-xr-x 12 ghoulss ghoulss 215  Dec  4 2024 Achievements.md 
                            `;
                        }
                    }
                    else if (lflag === "-lh")
                    {
                        isError = false;
                        if (currentdir === ":/root>")
                        {
                            coutput = `
                            drwxr-xr-x 43 root root 460K Nov 24 2024 Lessons.md
                            `;
                        }
                        else
                        {
                            coutput = `
                            drwxr-xr-x 43 ghoulss ghoulss 190K  Nov 24 2024 About.md <br/>
                            drwxr-xr-x  6 ghoulss ghoulss 1.4MB Nov 24 2024 Experience.md <br/>
                            drwxr-xr-x 12 ghoulss ghoulss 1.6MB Nov 25 2024 Projects.md <br/>
                            drwxr-xr-x 12 ghoulss ghoulss 162K  Dec  4 2024 Achievements.md 
                            `;
                        }
                    }
                    else
                    {
                       isError = true;
                       coutput = `Error: Invalid Flag <br/>
                                  Check "help -all" to see the available flags`;
                    }
                    break; 
                case "lshw":
                    
                    const hwflag = cmdinput.split(" ")[1]; 

                    if(!hwflag) 
                    {
                        isError = false;
                        coutput = `
                         <table style={{width: '100%'}}>
                            <tbody>
                            <tr>
                                <td>Host Name:</td>
                                <td>Desktop-C7F58157</td>
                            </tr>
                            <tr>
                                <td>OS Name:</td>
                                <td>PariahOS</td>
                            </tr>
                            <tr>
                                <td>OS Version:</td>
                                <td>V3.4 Build 2104</td>
                            </tr>
                            <tr>
                                <td>OS Manufacturer:</td>
                                <td>Hendson Technology</td>
                            </tr>
                            <tr>
                                <td>OS Configuration:</td>
                                <td>Lightweight Hosted Workstation</td>
                            </tr>
                            <tr>
                                <td>OS Build Type:</td>
                                <td>Multiprocessor Free</td>
                            </tr>
                            <tr>
                                <td>Product ID:</td>
                                <td>A43FE6-BE23D9-F38EA1</td>
                            </tr>
                            <tr>
                                <td>System Manufacturer:</td>
                                <td>Orion Corporation</td>
                            </tr>
                            <tr>
                                <td>System Model:</td>
                                <td>Verion TS-23-415</td>
                            </tr>
                            <tr>
                                <td>System Type:</td>
                                <td>64-bit PC</td>
                            </tr>
                            <tr>
                                <td>Processor:</td>
                                <td>1 Processor Installed.</td>
                            </tr>
                            <tr>
                                &nbsp;&nbsp;<td>&#91;01&#93;:</td>
                                <td>Processor Eilix Trex u5-6307B CPU @ 2.30GHz, 2423 Mhz, 4 Cores, 8 Logical Processors</td>
                            </tr>
                            <tr>
                                <td>BIOS Version:</td>
                                <td>Furios Logic V6.32</td>
                            </tr>
                            <tr>
                                <td>Root Directory:</td>
                                <td>/</td>
                            </tr>
                            <tr>
                                <td>Boot Device:</td>
                                <td>/dev/sda1</td>
                            </tr>
                            <tr>
                                <td>Total Physical Memory:</td>
                                <td>16,027 MB</td>
                            </tr>
                            </tbody>
                        </table>
                        `
                    }
                    else if (hwflag == "-a")
                    {
                        isError = false;
                        coutput = `
                         <table style={{width: '100%'}}>
                            <tbody>
                            <tr>
                                <td>Host Name:</td>
                                <td>Desktop-C7F58157</td>
                            </tr>
                            <tr>
                                <td>OS Name:</td>
                                <td>PariahOS</td>
                            </tr>
                            <tr>
                                <td>OS Version:</td>
                                <td>V3.4 Build 2104</td>
                            </tr>
                            <tr>
                                <td>OS Manufacturer:</td>
                                <td>Hendson Technology</td>
                            </tr>
                            <tr>
                                <td>OS Configuration:</td>
                                <td>Lightweight Hosted Workstation</td>
                            </tr>
                            <tr>
                                <td>OS Build Type:</td>
                                <td>Multiprocessor Free</td>
                            </tr>
                            <tr>
                                <td>Product ID:</td>
                                <td>A43FE6-BE23D9-F38EA1</td>
                            </tr>
                            <tr>
                                <td>System Manufacturer:</td>
                                <td>Orion Corporation</td>
                            </tr>
                            <tr>
                                <td>System Model:</td>
                                <td>Verion TS-23-415</td>
                            </tr>
                            <tr>
                                <td>System Type:</td>
                                <td>64-bit PC</td>
                            </tr>
                            <tr>
                                <td>Processor:</td>
                                <td>1 Processor Installed.</td>
                            </tr>
                            <tr>
                                &nbsp;&nbsp;<td>&#91;01&#93;:</td>
                                <td>Processor Eilix Trex u5-6307B CPU @ 2.30GHz, 2423 Mhz, 4 Cores, 8 Logical Processors</td>
                            </tr>
                            <tr>
                                <td>BIOS Version:</td>
                                <td>Furios Logic V6.32</td>
                            </tr>
                            <tr>
                                <td>Root Directory:</td>
                                <td>/</td>
                            </tr>
                            <tr>
                                <td>Boot Device:</td>
                                <td>/dev/sda1</td>
                            </tr>
                            <tr>
                                <td>Total Physical Memory:</td>
                                <td>16,027 MB</td>
                            </tr>
                            <tr>
                                <td>Hotfix(s): </td>
                                <td>&#91;01&#93;: SB201475</td>
                            </tr>
                            <tr>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                <td>&#91;02&#93;: SB201471</td>
                            </tr>
                            <tr>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                <td>&#91;02&#93;: SB201438</td>
                            </tr>
                            <tr>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                <td>&#91;02&#93;: SB201433</td>
                            </tr>
                            <tr>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                <td>&#91;02&#93;: SB201427</td>
                            </tr>
                            </tbody>
                            <tr>
                                <td>Network Card(s):</td>
                                <td>1 NIC(s) Installed.</td>
                            </tr>
                            <tr>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                <td>&#91;01&#93;: Xerox T205 Gigabit Ethernet Controller</td>
                            </tr>
                            <tr>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Connection Name: Ethernet</td>
                            </tr>
                            <tr>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Status: Media Connected</td>
                            </tr>
                        </table>
                        `
                    }
                    else 
                    {
                        isError = true;
                        coutput = `Error: Invalid Flag <br/>
                                   Check "help -all" to see the available flags`;
                    }
                    break;
                case "uname": 

                    const uflag = cmdinput.split(" ")[1];

                    if (!uflag)
                    {
                       isError = false;
                       coutput = "PariahOS V3.4 standard";
                    }
                    else if (uflag === "-a")
                    {
                       isError = false;
                       coutput = "Linux_PariahOS Desktop-C7F58157 24.06-Debian_Linux standard x86_64 GNU/Linux";
                    }
                    else if (uflag === "-r")
                    {
                       isError = false;
                       coutput = "Debian_Linux_24.06-standard";
                    }
                    else
                    {
                       isError = true;
                       coutput = `Error: Invalid Flag <br/>
                                  Check "help -all" to see the available flags`;
                    }
                    break;
                default:
                    isError = true;
                    coutput = "Command not found."
            }

            // Handle output formatting, prompt changes and managing state of previous commands
            if (cmdinput !== 'clear') 
            {
                // Clearly distinguish from successful output or error message
                if (isError === true)
                {
                    outputsection.innerHTML += `<div style="color: red">${coutput}</div>`;
                }
                if (isError === false)
                {
                    outputsection.innerHTML += `<div style="color: #90EE90">${coutput}</div>`;
                }  
                             
                if (cmdinput !== "")
                {
                   acmdcounter++;
                }
                cmdCounter++;
        
                outputsection.innerHTML += createCommandInput();

                console.log(document.querySelector(".user").innerHTML);

                //console.log(outputsection);
                retaininputstyle(`cmd${cmdCounter}`); 

                // Ensure that typed commands remain persistent until clear command is run
                for (let i = 1; i < cmdCounter; i++)
                {
                    const prevInputC = document.getElementById(`cmd${i}`);
                    console.log(cmdhistory[i - 1]);
                    if (i > 1)
                    {
                        prevInputC.value += cmdhistory[i - 1];
                    }
                    prevInputC.disabled = true;
                    console.log(prevInputC);
                }

                setTimeout(() => {
                    const newInput = document.getElementById(`cmd${cmdCounter}`);
                    newInput.focus(); 
                }, 0);
            }

            // Universal clear command behavior for terminal
            if (cmdinput === 'clear')
            {
                outputsection.innerHTML = '';
                cmdhistory = [];
                document.getElementById("prompt").innerHTML = coutput;
                document.getElementById("cmd1").disabled = false;
                document.getElementById("cmd1").value = '';
                document.getElementById("cmd1").focus();
            }
        }
        // Handle cycling through previous commands
        else if (event.keyCode === 38)
        {
            handleArrowUp(input);
            event.preventDefault();
        }
        else if (event.keyCode === 40)
        {
            handleArrowDown(input);
            event.preventDefault();
        }

    }

    function createCommandInput() {
        return `<span id="prompt"><span class="user" style="color: green;">${currentuser}</span><span style="color: green; font-weight: bold;">@</span><span style="color: purple;">PariahOS</span><span class="dir" style="color: yellow">${currentdir}</span></span>&nbsp;<input id="cmd${cmdCounter}" type="text" name="command" style="visibility:visible;" autocomplete="false" onkeyup="cmdcaller(event)"><div class="output"></div>`;
    }

    function retaininputstyle(inputId) {
        const cmdElement = document.getElementById(inputId);
        cmdElement.style.fontFamily = 'inherit';
        cmdElement.style.border = '0';
        cmdElement.style.outline = '0';
        cmdElement.style.color = 'white';
        cmdElement.style.padding = '7px 0';
        cmdElement.style.background = 'transparent';
        cmdElement.style.visibility = 'visible';
    }

    // ---------------------------------------- Handle terminal style up and down arrow keys for previous commands ---------------------------------------------------

    function handleArrowUp(cmdinputElement) {
        if (ahistoryindex > 0) {
            ahistoryindex--;
            cmdinputElement.value = acmdhistory[ahistoryindex];
            console.log(cmdinputElement.value);
        } else if (ahistoryindex === 0) {
            cmdinputElement.value = acmdhistory[ahistoryindex];
        }
    }

    function handleArrowDown(cmdinputElement) {
        if (ahistoryindex < acmdhistory.length - 1) {
            ahistoryindex++;
            cmdinputElement.value = acmdhistory[ahistoryindex];
            console.log(cmdinputElement.value);
        } else if (ahistoryindex === acmdhistory.length - 1) {
            ahistoryindex++;
            cmdinputElement.value = ""; // Clear the input if at the end of history
        }
    }

    // ---------------------------------------- Handle page refresh --------------------------------------------------------------------------------------------------

    window.addEventListener('beforeunload', (event) =>
    {
        event.preventDefault();
        // Revert to inital user and directory
        localStorage.setItem("current_directory", ":/home/ghoulss>");
        localStorage.setItem("current_user", "ghoulss");
    });

    // ---------------------------------------- Handle PageLoad ------------------------------------------------------------------------------------------------------
    document.addEventListener("DOMContentLoaded", async () => {
        await animateLines(lines, elements);
        displayPrompt(promptElement, promptParts);
        localStorage.setItem("current_directory", document.querySelector(".dir").innerHTML);
        localStorage.setItem("current_user", document.querySelector(".user").innerHTML);
        await showInputAfterPrompt();
        await showfootcontent(foot);
        if (input) {
            input.addEventListener("keydown", cmdcaller);
        }
        /*Focus on input after website is done loading*/
        document.getElementById("cmd1").focus(); 
    });