import { FaDribbble, FaFacebook, FaInstagram, FaPhoneAlt } from 'react-icons/fa';
import { FaLocationDot, FaX } from 'react-icons/fa6';
import { IoLogoBitbucket, IoMdMail } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Footer = () => {
    const companyArr = ["About us", "Careers", "Community", "Customers", "Contact us"];
    const partnerArr = ["For individuals", "For freelancers", "For teams", "For enterprises"];
    const resourcesArr = ["Support", "Security", "Help center", "Preferences", "Privacy policy", "Teams of use"];

    return (
      <footer>
        {/* Main Footer */}
        <div className='main'>
            <div className='left'>
                <div className='logo'>
                  <IoLogoBitbucket />
                  <h1>BuyBucket</h1>
                </div>

                <p className='description'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium, temporibus.</p>

                <div className='contact-info'>
                    <li><FaPhoneAlt /> +1 (0000) 9998887776 </li>
                    <li><IoMdMail/>  office@buybucket.io</li>
                    <li><FaLocationDot/> ABC 46, 123 Delhi, India</li>
                </div>
            </div>

            <div className='right'>
                    <FooterLinks linkArr={companyArr} title='Company' />
                    <FooterLinks linkArr={partnerArr} title='Partner' />
                    <FooterLinks linkArr={resourcesArr} title='Resources' />
                </div>
        </div>
        {/* mini footer */}
        <div className='mini'>
            {/* copyright */}
            <p className="footer-copyright">
                &copy; buybucket.io 2024
            </p>

            <div className="social-links">
                <Link to={"https://www.instagram.com"} target='_blank'><FaInstagram /></Link>
                <Link to={"https://www.facebook.com"} target='_blank'><FaFacebook /></Link>
                <Link to={"https://www.dribble.com"} target='_blank'><FaDribbble /></Link>
                <Link to={"https://www.twitter.com"} target='_blank'><FaX /></Link>
            </div>
        </div>
      </footer>
    )
}

const FooterLinks = ({linkArr, title} : {linkArr : string[], title : string}) => {
  return (
      <div className='footer-links'>
        <h1> {title} </h1>
        <ul>
            {
              linkArr.length > 0 && 
              linkArr.map((link,idx) => (
                <li key={idx}><Link to="#">{link}</Link></li>
              ))
            }
        </ul>
      </div>
    )
}

export default Footer
