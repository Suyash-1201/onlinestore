import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/adminpage.css';
import { useNavigate } from 'react-router-dom';
import Api from '../Api';

const Adminpage = () => {
  const num=Number(localStorage.getItem("number"));
  const nav=useNavigate();
  const [activeTab, setActiveTab] = useState('payments');
  const [admin,setadmin]=useState({});
  
  const [payments, setPayments] = useState([]);
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);

 
  const [allDummyProducts, setAllDummyProducts] = useState([]);
  const [userOrders, setUserOrders] = useState([]);

  
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  
       // Cleans up global margins on both html and body when OTP mounts
          useEffect(() => {
              document.documentElement.classList.add('signup-html-override');
              document.body.classList.add('signup-body-override');
              return () => {
                  document.documentElement.classList.remove('signup-html-override');
                  document.body.classList.remove('signup-body-override');
              };
          }, []);

          function logoutadmin(){
            localStorage.removeItem("number");
            nav("/signin")
          }

  
  useEffect(() => {
    fetchDataForTab(activeTab);
    fetchAllDummyProducts();
  }, [activeTab]);

  useEffect(()=>{
    async function getadmin() {
      try {
      const res=await Api.get(`/user/getadmin/${num}`)
      setadmin(res.data.data)
    } catch (error) {
      console.log(error.response?.message)
    }
    }
    getadmin()
  },[num])

  const fetchDataForTab = async (tab) => {
    try {
      if (tab === 'payments') {
        const res = await Api.get("/user/getallpayments");
        setPayments(res.data || []);
      } else if (tab === 'customers') {
        const res = await Api.get("/user/allusers");
        setUsers(res.data || []);
      } else if (tab === 'reports') {
        const res = await Api.get("/user/getallcontacts");
        setReports(res.data || []);
      }
    } catch (error) {
      console.error(`Error fetching ${tab}:`, error);
    }
  };

  const fetchAllDummyProducts = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products?limit=100");
      setAllDummyProducts(res.data.products || []);
    } catch (error) {
      console.error("Error fetching DummyJSON products:", error);
    }
  };


  const handleRowClick = async (item) => {
    if (activeTab === 'customers') {
      setSelectedItem(item);
      const userNumber = item.number || item.mobile;
      if (userNumber) {
        try {
          const res = await Api.get(`/user/getorders/${userNumber}`);
          setUserOrders(res.data || []);
        } catch (error) {
          console.error("Error fetching user orders:", error);
          setUserOrders([]);
        }
      } else {
        setUserOrders([]);
      }
    }
  };

 


  const handleStatusToggle = async (id, e) => {
    e.stopPropagation();
    try {
      await Api.put(`/user/updatestatus/${id}`);
      fetchDataForTab('reports');
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

 
  const renderTableHeaders = () => {
    if (activeTab === 'payments') {
      return (
        <tr>
          <th>Payment ID</th>
          <th>Payment For</th>
          <th>User Number</th>
          <th>Status</th>
          <th>Amount</th>
          <th></th>
        </tr>
      );
    } else if (activeTab === 'customers') {
      return (
        <tr>
          <th>User ID</th>
          <th>Customer Name</th>
          <th>Role</th>
          <th>Mobile Number</th>
          <th></th>
        </tr>
      );
    } else if (activeTab === 'reports') {
      return (
        <tr>
          <th>Contact ID</th>
          <th>Name</th>
          <th>Mobile</th>
          <th>Status</th>
          <th>Message</th>
        </tr>
      );
    }
  };

  
  const renderTableContent = () => {
    if (activeTab === 'payments') {
      if (payments.length === 0) return <tr><td colSpan="6" className="no-data">No payment records found.</td></tr>;
      return payments.map((item, idx) => (
        <tr key={item.paymentid || idx}>
          <td className="bold-text">#PAY-{item.paymentid || idx + 1}</td>
          <td className="bold-text">{item.payfor || 'General Order'}</td>
          <td>{item.number || 'N/A'}</td>
          <td><span className="status-pill paid">Success</span></td>
          <td className="bold-text">₹{item.amount || '0.00'}</td>
        </tr>
      ));
    } else if (activeTab === 'customers') {
      if (users.length === 0) return <tr><td colSpan="5" className="no-data">No users found.</td></tr>;
      return users.map((item, idx) => (
        <tr key={item.userid || item.id || idx} onClick={() => handleRowClick(item)}>
          <td className="bold-text">#USR-{item.userid || item.id || idx + 1}</td>
          <td>
            <div className="customer-cell">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="avatar" />
              <span>{item.name || item.uname || "User"}</span>
            </div>
          </td>
          <td><span className="status-pill delivered">{item.role || 'USER'}</span></td>
          <td>{item.number || item.mobile || 'N/A'}</td>
          <td className="dots-cell">•••</td>
        </tr>
      ));
    } else if (activeTab === 'reports') {
      if (reports.length === 0) return <tr><td colSpan="5" className="no-data">No contact reports found.</td></tr>;
      return reports.map((item, idx) => (
        <tr key={item.contactid || idx}>
          <td className="bold-text">#{item.contactid || idx + 1}</td>
          <td className="bold-text">{item.name}</td>
          <td>{item.mobile}</td>
          <td>
            <button 
              className={`status-btn ${item.status ? 'solved' : 'pending'}`}
              onClick={(e) => handleStatusToggle(item.contactid, e)}
            >
              {item.status ? 'Solved (Green)' : 'Pending (Red)'}
            </button>
          </td>
          <td>
            <button 
              className="btn-view-msg"
              onClick={() => setSelectedMessage(item.message)}
            >
              View Message
            </button>
          </td>
        </tr>
      ));
    }
  };

  return (
    <div className="dashboard-container">
     
      <div className="mobile-top-bar">
        <button className="menu-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          ☰ Menu
        </button>
        <span className="mobile-brand">⚡ ONLINE-STORE</span>
      </div>

      {/* LEFT SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-icon">⚡</div>
          <h2>ONLINE-STORE</h2>
          <button className="close-sidebar-btn" onClick={() => setSidebarOpen(false)}>&times;</button>
        </div>

        <nav className="sidebar-menu">
          <div className="menu-category">Menu</div>
          <ul>
            <li className={activeTab === 'payments' ? 'active' : ''} onClick={() => { setActiveTab('payments'); setSidebarOpen(false); }}>
              <i>💳</i> Payments
            </li>
            <li className={activeTab === 'customers' ? 'active' : ''} onClick={() => { setActiveTab('customers'); setSidebarOpen(false); }}>
              <i>👥</i> Customers
            </li>
            <li className={activeTab === 'reports' ? 'active' : ''} onClick={() => { setActiveTab('reports'); setSidebarOpen(false); }}>
              <i>📈</i> Reports / Contacts
            </li>
          </ul>
        </nav>
        <div>
           <button className="logout-btn" onClick={()=>nav("/adminsignup")}>
            <i>🚪</i> Add admin
          </button>
        </div>
        <div className="sidebar-footer" onClick={logoutadmin}>
          <button className="logout-btn">
            <i>🚪</i> Logout
          </button>
        </div>
      </aside>

     
      <main className="main-viewport">
        <header className="main-header">
          <div className="header-title">
            <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          </div>
          <div className="header-controls">
            <div className="user-profile-pill">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Admin" />
              <div className="user-info">
                <strong>{admin.adminname}</strong>
                <span>{admin.number}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Data Table */}
        <div className="table-card-container">
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                {renderTableHeaders()}
              </thead>
              <tbody>
                {renderTableContent()}
              </tbody>
            </table>
          </div>
        </div>
      </main>

    
      {selectedItem && (
        <div className="drawer-backdrop" onClick={() => setSelectedItem(null)}>
          <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>Customer Details #{selectedItem.userid || selectedItem.id || '390561'}</h3>
              <button className="drawer-close" onClick={() => setSelectedItem(null)}>&times;</button>
            </div>

            <div className="drawer-subbar">
              <span className="status-pill paid">Active</span>
            </div>

            <div className="customer-profile-card">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" alt="Client" />
              <h4>{selectedItem.name || selectedItem.uname || "Client Details"}</h4>
              <p className="drawer-contact-info">{selectedItem.number || selectedItem.mobile || "No contact info"}</p>
            </div>

            <div className="drawer-section-title">User Ordered Items (Matched via API)</div>

            <div className="drawer-items-list">
              {userOrders.length > 0 ? (
                userOrders.map((ord, idx) => {
                  const matchedProduct = allDummyProducts.find(p => p.id === ord.prodid || p.id === ord.productid);
                  return (
                    <div className="drawer-item-row" key={idx}>
                      <img 
                        src={matchedProduct ? matchedProduct.thumbnail : "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100"} 
                        alt="Product" 
                      />
                      <div className="item-details">
                        <strong>{matchedProduct ? matchedProduct.title : `Product ID: ${ord.prodid || ord.productid}`}</strong>
                        <span>₹{matchedProduct ? matchedProduct.price : (ord.amount || '0.00')}</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="no-orders-text">No specific orders found for this user number.</p>
              )}
            </div>

          </div>
        </div>
      )}

      {/* MESSAGE POPUP MODAL FOR REPORTS */}
      {selectedMessage !== null && (
        <div className="modal-overlay" onClick={() => setSelectedMessage(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Contact Message</h3>
              <button
                className="modal-close-btn"
                onClick={() => setSelectedMessage(null)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>{selectedMessage || "No message provided."}</p>
            </div>
            <div className="modal-footer">
              <button
                className="btn-secondary"
                onClick={() => setSelectedMessage(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adminpage;