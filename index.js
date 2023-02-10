
function Navbar() {
    return (
        <span className="navbar">
            <div>
                <img src="https://th.bing.com/th/id/R.73efe708250aa8d2c4cfb700ab5861b9?rik=kiuNdQ8WwJ5MPg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fmeme-png-lol-meme-face-512.png&ehk=AKJy6HLsYA%2bWus72cn6HcJ9utgFu9%2b%2bqd1HxzAvlwIY%3d&risl=&pid=ImgRaw&r=0" />
                <p className="title">Meme Generator</p>
            </div>
            <p>React Course - Project 3</p>
        </span>
    )
}

function Form() {
    const [memeData, setMemeData] = React.useState([])

    const[generatedMemeData, setGeneratedMemeData] = React.useState({
        topText: 'Top Text',
        bottomText: 'Bottom Text',
        url: "https://i.imgflip.com/30b1gx.jpg"
    })

    React.useEffect(
        function () {
            fetch('https://api.imgflip.com/get_memes')
                .then((res) => res.json())
                .then((resjson) => {
                    setMemeData(resjson.data.memes)
                })
        }
        , [])

    console.log(memeData)

    function settingUrl() {
        const index = Math.floor(Math.random() * memeData.length)
        const memeUrl = memeData[index].url

        setGeneratedMemeData(function(prev){
            return {
                ...prev,
                url: memeUrl
            }
        })
    }

    function settingTopBottomText(event) {
        const { name, value } = event.target
        setGeneratedMemeData(function (prev) {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    return (
        <main>
            <div className="form">
                <input type="text" placeholder="Top text" className="form-inputs" name='topText' onChange={settingTopBottomText} />
                <input type="text" placeholder="Bottom text" className="form-inputs" name='bottomText' onChange={settingTopBottomText} />
                <button onClick={settingUrl} className="form-button">Get a new image 🧙‍♂️</button>
            </div>
            <div className='meme'>
                <img src={generatedMemeData.url} className="meme-img" />
                <h2 className='meme-top-text'>{generatedMemeData.topText}</h2>
                <h2 className='meme-bottom-text'>{generatedMemeData.bottomText}</h2>
            </div>
        </main>
    )
}


function App() {

    return (
        <div>
            <Navbar />
            <Form />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
)

