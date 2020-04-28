const form = document.getElementById('form')
form.addEventListener('submit', addUrl)

function addUrl(e) {
    const siteName = document.getElementById('siteName').value
    const siteUrl = document.getElementById('siteUrl').value

    if (!formValidator(siteName, siteUrl)) {
        return false
    }

    const bookmark = {
        name: siteName,
        url: siteUrl
    }

    let bookmarks = []

    if (localStorage.getItem('bookmarks') === null) {
        bookmarks = []
    } else {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    }

    bookmarks.push(bookmark)
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

    e.preventDefault()
    fetchBookmark()
    form.reset()
}

// Fetch Data
function fetchBookmark() {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    let bookmarkLists = document.getElementById('bookmarkLists')
    const bookmarkContainer = document.getElementById('bookmarkContainer')
    const noBookmark = document.getElementById('noBookmark')
    if (bookmarks.length < 1) {
        bookmarkContainer.style.display = 'none'
        noBookmark.innerHTML = 'Opps! There is no bookmark'
    } else {
        bookmarkContainer.style.display = 'block'
        noBookmark.innerHTML = ''
    }
    bookmarkLists.innerHTML = ''
    bookmarks.map(bookmark => {
        const { name, url } = bookmark
        bookmarkLists.innerHTML += `
        <div class="card my-2">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <a href="${url}" target="_blank" class="btn btn-primary btn-sm">Visit</a>
                <a href="#" onClick="deleteBookmark('${url}')" class="btn btn-danger btn-sm">Delete</a>
            </div>
        </div>
        `
    })
}

// Delete Bookmark
function deleteBookmark(url) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    bookmarks.map((bookmark, ind) => {
        if (bookmark.url === url) {
            bookmarks.splice(ind, 1)
        }
    })
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

    fetchBookmark()
}

// Form validator
function formValidator(siteName, url) {
    if (!siteName) {
        alert('Please provide site name')
        return false
    }
    if (!url) {
        alert('Please provide valid site url')
        return false
    }

    let expression = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    let regex = new RegExp(expression)

    if (!url.match(regex)) {
        alert('Please provide a valid url')
        return false
    }
    return true
}