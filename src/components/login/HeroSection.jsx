import heroImage from "../../assets/images/hero.png";
import logoImage from "../../assets/images/logo.png";

function HeroSection() {
    return (
        <div className="hero-section">

            <div className="brand">

                <img
                    src={logoImage}
                    alt="Logo Amanah Elektronik"
                    className="brand-logo"
                />

                <div className="brand-text">

                    <h2>Amanah Elektronik</h2>

                    <p>Rental Elektronik Terpercaya</p>

                </div>

            </div>

            <div className="hero-text">

                <h1>
                    Sewa Elektronik
                    <span>Mudah, Cepat, Amanah</span>
                </h1>

                <div className="line"></div>

                <p>
                    Platform penyewaan berbagai peralatan elektronik
                    berkualitas untuk kebutuhan acara, kerja,
                    maupun hiburan.
                </p>

            </div>

            <div className="hero-image-wrapper">

                <img
                    src={heroImage}
                    alt="Hero"
                    className="hero-image"
                />

            </div>

        </div>
    );
}

export default HeroSection;