import React from 'react';
import '../css/home_styles.css';
import Background from '../../img5.jpeg';

const Home = () => {
    return(
        <div className='d-flex justify-content-center' style={{  }}>

            <div className='pt-lg-5' style={{ position: 'absolute', textAlign: 'center' }}>
                <h1 style={{ color: 'black' }} className='font-weight-bold display-4'><b>xxxx xxxx xxxxxx xxxxxxxx</b></h1>
                <h1 style={{ color: 'black' }} className='font-weight-bold display-7'>xxxx xxx xxxx xxxx xxx</h1><br/><br/>
                <h1 style={{ color: 'black' }} className='font-weight-bold display-4'> <b>xxxx xxxxx xxxxx</b></h1>
                
            </div>

            <div style={{ position: 'absolute', marginTop: 550 }}>
                <h3 style={{ color: 'black' }} className='font-weight-bold'>xxxxxx.twitter.com</h3>
                <h3 style={{ color: 'black' }} className='font-weight-bold'>xxxxxx.facebook.com</h3>
                <h3 style={{ color: 'black' }} className='font-weight-bold'>xxxxxx.facebook.com</h3>
                <h3 style={{ color: 'black' }} className='font-weight-bold'>xxxxxx.youtube.com</h3>
            </div>
            <div style={{ position: 'absolute', marginTop: 750 }}>
                <h3 style={{ color: 'black' }} className='font-weight-bold'>Hotline - xxx-xxxxxxx, xxx-xxxxxxx, xxx-xxxxxxx</h3>
            </div>

            
            <img className='imgHome' src={ Background } />

            
            
        </div>
    )
}

export default Home;