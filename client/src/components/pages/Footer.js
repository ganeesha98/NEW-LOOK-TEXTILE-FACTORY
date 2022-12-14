import React from "react";
import "../css/Footer.css";


function Footer() {
  return (
    
    <footer className="footer">
  	 <div className="container">
  	 	<div className="row">
  	 		<div className="footer-col">
  	 			<h4>Quick Links</h4>
				   <hr></hr>
  	 			<ul>
  	 				<li><a href="#">Home</a></li>
  	 				<li><a href="#">Customer</a></li>
  	 				<li><a href="#">Employee</a></li>
  	 				<li><a href="#">Stock</a></li>
				    <li><a href="#">Order</a></li>
					<li><a href="#">Supplier</a></li>
					<li><a href="#">outlet</a></li>
					<li><a href="#">Machine</a></li>
					<li><a href="#">Deliver</a></li>
                    <li><a href="#"></a></li>
  	 			</ul>
  	 		</div>
  	 		<div  className="footer-col">
  	 			<h4>Contact Us</h4>
				   <hr></hr>
  	 			<ul>
				   	<li><a>New Look Textile,
					   No 07, Fernando Mawatha
					   Colombo</a></li><br></br>
  	 				<li><a>0114584682</a></li>
  	 				<li><a>0125467862</a></li>
  	 				<li><a>info@newloook.lk</a></li>
  	 				
  	 			</ul>
  	 		</div>
  	 		
  	 		<div class="footer-col">
  	 			<h4>follow us</h4>
				   <hr></hr>
  	 			<div className="social-links">
  	 				<a href="#"><i class="fab fa-facebook-f"></i></a>
  	 				<a href="#"><i class="fab fa-twitter"></i></a>
  	 				<a href="#"><i class="fab fa-instagram"></i></a>
  	 				<a href="#"><i class="fab fa-linkedin-in"></i></a>
  	 			</div>
  	 		</div>
  	 	</div>
  	 </div>
  </footer>

  );
}

export default Footer;