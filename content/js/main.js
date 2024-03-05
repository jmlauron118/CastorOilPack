(function (){
    var page = new LandingPage()

    page.InitLandingPage();
})();

function LandingPage(){
    const _page = this;
    var backToTop = document.getElementsByClassName("back-to-top")[0];
    var rtime;
    var timeout = false;
    var delta = 200;

    //Initializing Landing Page
    this.InitLandingPage = () =>{
        var navbar = document.getElementById("menu");
        var sticky = navbar.offsetTop;
        var width = document.documentElement.clientWidth;

        _page.showHideElem(backToTop, 0);

        AOS.init({
          duration: 600,
          startEvent: 'DOMContentLoaded',
          anchorPlacement: 'center-bottom'
        });

        document.getElementById("logo").addEventListener("click", () => {
          var url = window.location.href;
          var homeUrl = url.includes("index.html")
            ? url.split("index.html")[0] + "index.html"
            : url + "index.html";
    
          _page.showHideElem(backToTop, 0);
          window.location.replace(homeUrl);
        });

        //Event for mouse scroll
        window.onscroll = function () {
            var body = document.getElementsByTagName("BODY")[0];
        
            if (body.scrollTop >= 100) {
                _page.showHideElem(backToTop, 1);
            } else {
                _page.showHideElem(backToTop, 0);
            }
        
            _page.StickyMenu(navbar, sticky);
        };

        //Event for resizing the browser
        window.addEventListener("resize", () => {
            rtime = new Date();
            if (timeout === false) {
                timeout = true;
                setTimeout(resizeEnd(navbar, width), delta);
            }
        });

        //Click event for mobile mode menu
        document.getElementsByClassName("mobile-menu")[0].addEventListener("click", () => {
            var menu = document.getElementsByClassName("menu");

            if (menu.length > 0) {
                menu[0].classList.add("open");
            }
        });

        //Event for back to top function
        backToTop.addEventListener("click", () => {
            var body = document.getElementsByTagName("BODY")[0];
      
            body.scrollTop = 0;
        });

        //Event to close the mobile view side bar when clicked outside
        window.addEventListener("click", (e) => {
          let menu = document.getElementById("menu");
          let mobMenu = document.querySelector(".mobile-menu");

          if (!menu.contains(e.target) && !mobMenu.contains(e.target)) {
            document.getElementsByClassName("close-sidebar")[0].click();
          }
        });
        
        _page.ResizeWindow(width, navbar);
        _page.StickyMenu(navbar, sticky);
        _page.HoverEvent();
        _page.MenuClickEvent();
    }

    this.StickyMenu = (navbar, sticky) => {
        var screenWidth = window.innerWidth; //(window.innerWidth > 0) ? window.innerWidth : screen.width;

        if (screenWidth >= 769) {
            if (window.pageYOffset > sticky) {
                navbar.classList.remove("menu");
                navbar.classList.add("sticky");
            } else {
                navbar.classList.remove("sticky");
                navbar.classList.add("menu");
            }
        }
    };

    this.MenuClickEvent = () => {
        var allMenu = document.querySelectorAll("a[class^=nav-link]");
    
        for (var i = 0; i < allMenu.length; i++) {
          allMenu[i].addEventListener("click", function () {
            var a = Array.from(document.querySelectorAll("a[class^='nav-link']"));
    
            for (let elem of a) {
              elem.classList.remove("active");
            }
    
            this.classList.add("active");
    
            var id = this.id;
            var parentId = id.split("-")[1];
            var parentDiv = document.getElementById(parentId);
            var topPos = parentDiv.offsetTop;
    
            document.getElementsByTagName("BODY")[0].scrollTop = topPos - 100;
          });
        }
    };

    this.ResizeWindow = (width, navbar) => {
        var body = document.getElementsByTagName("BODY")[0];
      
        if (width < 768) {//mobile view
            navbar.classList.remove("sticky");
            navbar.classList.add("menu");

            document.getElementsByClassName("close-sidebar")[0].addEventListener("click", () => {
                var menu = document.getElementById("menu");
                
                if (menu.classList.contains("open")) {
                    menu.classList.remove("open");
                }
            });

            document.getElementById("home-container").classList.add("d-flex", "flex-column-reverse");
            AOS.refresh();
        }
        else{//web view
            document.getElementsByClassName("close-sidebar")[0].click();
            
            if(body.scrollTop == 0){
                navbar.classList.remove("sticky");
                navbar.classList.add("menu");
            }
            else{
                navbar.classList.remove("menu");
                navbar.classList.add("sticky");
            }

            document.getElementById("home-container").classList.remove("d-flex", "flex-column-reverse");
        }
    };

    this.HoverEvent = () => {
        var section = document.querySelectorAll("div[class='info-content']");
    
        window.addEventListener("scroll", function () {
          var currentScroll = window.pageYOffset;
          var currentSection;
    
          for (var i = 0; i < section.length; i++) {
            var divPosition = section[i].offsetTop - 200;
    
            if (divPosition - 1 < currentScroll) {
              currentSection = section[i];
    
              var id = currentSection.id;
              var navLink = document.querySelector("a[id='nav-" + id + "']");
              var a = Array.from(
                document.querySelectorAll("a[class='nav-link active']")
              );
    
              if (a != undefined) {
                for (let elem of a) {
                  elem.classList.remove("active");
                }
              }
    
              if (navLink != null) {
                navLink.classList.add("active");
                _page.ChangePageTitle(navLink.text);
              }
            }
          }
        });
    };

    this.showHideElem = (elem, isShown) => {
        if (isShown) {
          elem.style.visibility = "visible";
        } else {
          elem.style.visibility = "hidden";
        }
    };

    this.ChangePageTitle = (pageName = "") => {
        var currPageName = document.getElementById("txtTitle").text;
        var splitName = currPageName.split("-");
    
        if (pageName != "") {
          pageName =
            pageName.charAt(0).toUpperCase() + pageName.slice(1).toLowerCase();
          document.getElementById("txtTitle").text =
            pageName +
            " - " +
            (splitName.length > 1 ? splitName[1].trim() : splitName[0].trim());
        } else {
          document.getElementById("txtTitle").text =
            splitName.length > 1 ? splitName[1].trim() : splitName[0].trim();
        }
    };

    function resizeEnd() {
        var navbar = document.getElementById("menu");
        var width = document.documentElement.clientWidth;
    
        if (new Date() - rtime < delta) {
            setTimeout(resizeEnd, delta);
        } else {
          timeout = false;
            _page.ResizeWindow(width, navbar);
        }
    }
}