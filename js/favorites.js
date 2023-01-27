// classe que vai conter a lógica dos dados

export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root),
        this.load()
    }

    load() {
        this.entries = [
            {
                login: 'Gisellebm',
                name: 'Giselle Brasil Macedo',
                public_repos: '47',
                folowers: '21'
            },
            {
                login: 'maykbrito',
                name: 'Mayk Brito',
                public_repos: '76',
                folowers: '5000'
            }
        ]
    }

    delete(user) {
        const filteredEntries = this.entries
            .filter(entry => entry.login !== user.login)

        this.entries = filteredEntries
        this.update()
    }
}

// classe que vai criar a visualização e eventos do html 
export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)

        this.tbody = this.root.querySelector('table tbody')

        this.update()
    }

    update() {
        this.removeAllTr()

        this.entries.forEach( user => {
            const row = this.createRow()
            
            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user img').alt = `Imagem de ${user.name}`
            row.querySelector('.user p').textContent = user.name
            row.querySelector('.repositories').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.folowers
            row.querySelector('.remove').onclick = () => {
                const isOk = confirm('Tem certeza que desja deletar essa linha?')
                if(isOk) {
                    this.delete(user)
                }
            }

            this.tbody.append(row)
        })

    }

    createRow() {
        const tr = document.createElement('tr')

        tr.innerHTML = `
        <tr> 
            <td class="user"> 
                <img src="https://github.com/Gisellebm.png" alt="">
                <a href="https://github.com/Gisellebm" target="_blank">
                    <p>Giselle Brasil Macedo</p>
                    <span>Gisellebm</span>
                </a>
            </td>
            <td class="repositories">
                47
            </td>
            <td class="followers">
                21
            </td>
            <td>
                <button class="remove">&times;</button>
            </td>
        </tr>
        `
        return tr
    }

    removeAllTr() {
        this.tbody.querySelectorAll('tr').forEach((tr) => {
            tr.remove()
        });
    }
}
