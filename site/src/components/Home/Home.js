import "./Home.css"

function Home() {
    function parallax(e) {
        let parallax = document.querySelectorAll('.parallax-image')

        let posX = e.clientX
        let posY = e.clientY
        let percent = -100
        for (let elem of parallax) {
            elem.style.transform = 'translate(' + posX / percent + 'px, ' + posY / percent +'px)'
            percent += 33
        }
    }

    window.addEventListener("DOMContentLoaded", () => {
        parallax()
    })
    
    return (
        <>
            <div className="parallax" onMouseMove={parallax}>
                <div className="parallax-image parallax-image-1"></div>
                <div className="parallax-image parallax-image-2"></div>
                <div className="parallax-image parallax-image-3"></div>
                <div className="navbar">
                    <ul className="nav-ul">
                        <li>Market</li>
                        <li>Contact</li>
                        <li>Profs</li>
                    </ul>
                </div>
            </div>
            <div className="yeah">
                yeahh
            </div>
        </>
    )
}

export default Home