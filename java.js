$('#hamburger').click(function () {
    $('.top_nav ul').css("flex-direction", "column").css("align-items", "flex-end")
    $('.top_nav ul li').toggle("fast", "linear")
})

//Data Source -- GoogleSheet

let source = "https://spreadsheets.google.com/feeds/list/1wVjdMce-oO0pND1evxCbDKfE0wYQf-CfBov_3DmnMuQ/od6/public/values?alt=json";

//"Fetch" function returns an Array "projects" of objects
fetch(source)
    .then(response => response.json())
    .then(data => {
        let projects = data.feed.entry.map(project => {
            return {
                title: project.gsx$title.$t,
                description: project.gsx$description.$t,
                image: project.gsx$image.$t,
                url: project.gsx$url.$t,
                category: project.gsx$category.$t,
                recent: project.gsx$recent.$t
            }
        })
        app(projects)
    })

// Create subArrays using 2 functions app and loadCategory
let jQuery = []
let Flexbox_Grid = []
let HTML_CSS = []
let React = []
let other = []

function app(projects) {
    for (i = 0; i < projects.length; i++) {
        if (projects[i].category === "jQuery") {
            jQuery.push(projects[i])
        }
        else if (projects[i].category === "Flexbox_Grid") {
            Flexbox_Grid.push(projects[i])
        }
        else if (projects[i].category === "HTML_CSS") {
            HTML_CSS.push(projects[i])
        }
        else {
            other.push(projects[i])
        }
    }
    return loadCategory(jQuery)
}

const $project_parent = $('section.project_parent')

function loadCategory(filteredArray) {
    for (i = 0; i < filteredArray.length; i++) {
        let $div = $('<div>').addClass('project')
        $project_parent.append($div)
        // let $h5 = $('<h5>').html(filteredArray[i].description).addClass('project_h5')
        // $div.append($h5)
        let $img = $('<img>').attr('src', filteredArray[i].image).attr('alt', "project image").attr('title', `${filteredArray[i].description} example`).addClass('project_img')
        $div.append($img)
        let $h6 = $('<h6>').html(filteredArray[i].title).addClass('project_h6')
        $div.append($h6)
    }
    return
}

// Event Listeners
$('.li_flexbox').on('click', () => {
    $project_parent.empty()
    $project_parent.css("background-color", "rgba(194,198,78,1)")
    $(".project_wrapper").css("background-color", "rgba(194,198,78,1)")
    loadCategory(Flexbox_Grid)
    $h6.css("background-color", "inherit")
})
$('.li_html').on('click', () => {
    $project_parent.empty()
    $project_parent.css("background-color", "rgba(198,78,78,1)")
    $(".project_wrapper").css("background-color", "rgba(198,78,78,1)")
    loadCategory(HTML_CSS)
    $h6.css("background-color", "inherit")
})
$('.li_react').on('click', () => {
    $project_parent.empty()
    $project_parent.css("background-color", "rgba(78,130,198,1)").css("align-items", "center")
    $(".project_wrapper").css("background-color", "rgba(78,130,198,1)")
    let $div = $('<div>').addClass('project')
    $project_parent.append($div)
    $div.css("height", "225px").css("width", "225px")
    let $h6 = $('<h6>').html(other[0].title).addClass('project_h6')
    $div.append($h6)
    $h6.css("background-color", "inherit")
    $(window).resize(function () {
        if ($('header').width() === "768px") {
            $('.project_nav').css("max-width", "175px")
        }
    })
})
$('.li_jQuery').on('click', () => {
    $project_parent.empty()
    $project_parent.css("background-color", "rgba(80,150,146,1)")
    $('.project_wrapper').css("background-color", " rgba(80,150,146,1)")
    loadCategory(jQuery)
    $h6.css("background-color", "inherit")
})

// Contact Form Listener
$('#submit').on('click', () => {
    alert("Thanks & Received!")
    $('form')[0].reset()

})