import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './Dbord.css';
import { useEffect } from 'react';
import axios from 'axios';


function Dbord() {
  const [data, setData] = useState([])
  const [isCreditUpdate, setIsCreditUpdate] = useState(false);
  const [showCredit, setShowCredit] = useState(false);
  const [showDebit, setShowDebit] = useState(false);

  const handleCreditClose = () => setShowCredit(false);
  const handleDebitClose = () => setShowDebit(false);

  const handleCreditShow = () => setShowCredit(true);
  const handleDebitShow = () => setShowDebit(true);
  


const [category, setCategory] = useState('');
const [date, setDate] = useState('');
const [camt, setCamt] = useState('');
const [damt, setDamt] = useState(0); // default 0 for credit
const [status, setStatus] = useState('');

  const handleid=(e)=>{setid(e.target.value)}
  const handledate=(e)=>{setdate(e.target.value)}
  const handlecategory=(e)=>{setcategory(e.target.value)}
  const handlecamt=(e)=>{setcamt(e.target.value)}
  const handledamt=(e)=>{setdamt(e.target.value)}
  const handlestatus=(e)=>{setstatus(e.target.value)}

const [transactions, setTransactions] = useState([]);

const [totalSaving, setTotalSaving] = useState(0);
const [totalExpense, setTotalExpense] = useState(0);
const [totalCreditDebit, setTotalCreditDebit] = useState(0);
const [totalRemaining, setTotalRemaining] = useState(0);

// searching pattern
const [creditSearchTerm, setCreditSearchTerm] = useState('');
const [debitSearchTerm, setDebitSearchTerm] = useState('');


  
 //onload
 useEffect(() => {  
    capi()
    dapi()
    fetchData();
  },[])
  
  // for cards
const fetchData = () => {
  axios.get("http://localhost:8080/ptms")
    .then(res => {
      const data = res.data.menulist || [];
      setTransactions(data);

      const creditSum = data.reduce((acc, curr) => acc + (parseFloat(curr.camt) || 0), 0);
      const debitSum = data.reduce((acc, curr) => acc + (parseFloat(curr.damt) || 0), 0);

      setTotalSaving(creditSum);
      setTotalExpense(debitSum);
      setTotalCreditDebit(creditSum + debitSum);
      setTotalRemaining(creditSum - debitSum);
    })
    .catch(err => {
      console.error("Failed to fetch dashboard data", err);
    });
};



  const capi = () => {
  axios.get("http://localhost:8080/credited-transactions")
    .then(res => {
      setCreditedTransactions(res.data.creditedTransactions);
    })
    .catch(err => {
      console.error("Error fetching credited transactions", err);
    });
};

const dapi = () => {
  axios.get("http://localhost:8080/debited-transactions")
    .then(res => {
      setDebitedTransactions(res.data.debitedTransactions);
    })
    .catch(err => {
      console.error("Error fetching credited transactions", err);
    });
};




      const getnm=()=>{
      // console.log(id) 
      console.log(date) 
      console.log(category)
      console.log(camt) 
      console.log(damt)
      console.log(status)
      
      const dt ={
        // id: id,
        date: date,
        category: category,
        camt: camt,
        damt: damt,
        status:status
      }

      const clearInput = () => {
        setCategory('');
        setDate('');
        setCamt('');
        setDamt(0);
        setStatus('');
      };


      axios.post('http://localhost:8080/save', dt)
      .then(res=>{
        if(res.data.status == "200"){
          alert('Transaction Successfully')
          capi() 
          dapi()
          fetchData()
          setShowCredit(false); 
          setShowDebit(false);
          clearInput(); 
        }else{
          alert('Not Added!..')
        }
      })
    }      



      //  Getting information from api calling into the table for credit
      const [creditedTransactions, setCreditedTransactions] = useState([]);
      useEffect(() => {
        axios.get("http://localhost:8080/credited-transactions")
          .then(res => {
            setCreditedTransactions(res.data.creditedTransactions);
          })
          .catch(err => {
            console.error("Error fetching credited transactions", err);
          });
      }, []);

         //  Getting information from api calling into the table for Debit
      const [debitedTransactions, setDebitedTransactions] = useState([]);
      useEffect(() => {
        axios.get("http://localhost:8080/debited-transactions")
          .then(res => {
            setDebitedTransactions(res.data.debitedTransactions);
          })
          .catch(err => {
            console.error("Error fetching Debited transactions", err);
          });
      }, []);
      //  update the credit table 

  return (
    <>
      {/* cards */}
      <div className="container">
      <div className="card-container">
        {/* SAVING */}
        <div className="dashboard-card yellow">
          <div className="card-top">
            <div className="card-info">
              <h3>₹{totalSaving}</h3>
              <p>SAVING</p>
            </div>
            <div className="card-icon">
              <i className="fas fa-dollar-sign"></i>
            </div>
          </div>
          <div className="card-bottom">
            <span><h3>Your all Savings</h3></span>
          </div>
        </div>

        {/* EXPENSE */}
        <div className="dashboard-card red">
          <div className="card-top">
            <div className="card-info">
              <h3>₹{totalExpense}</h3>
              <p>EXPENSE</p>
            </div>
            <div className="card-icon">
              <i className="fas fa-calendar-alt"></i>
            </div>
          </div>
          <div className="card-bottom">
            <span><h3>Your all Expense</h3></span>
          </div>
        </div>

        {/* TRANSACTION */}
        <div className="dashboard-card green">
          <div className="card-top">
            <div className="card-info">
              <h3>₹{totalCreditDebit}</h3>
              <p>CREDIT + DEBIT</p>
            </div>
            <div className="card-icon">
              <i className="fas fa-file-alt"></i>
            </div>
          </div>
          <div className="card-bottom">
            <span><h3>Your all Transaction</h3></span>
          </div>
        </div>

        {/* REMAINING */}
        <div className="dashboard-card blue">
          <div className="card-top">
            <div className="card-info">
              <h3>₹{totalRemaining}</h3>
              <p>CREDIT - DEBIT</p>
            </div>
            <div className="card-icon">
              <i className="fas fa-thumbs-up"></i>
            </div>
          </div>
          <div className="card-bottom">
            <span><h3>Your all Remaining</h3></span>
          </div>
        </div>
      </div>
    </div>
      <br />

      {/* Modal Buttons */}
      <div className="modal-button-group">
        <Button className="btn-credit" onClick={handleCreditShow}>ADD CREDIT</Button>
        <Button className="btn-debit" onClick={handleDebitShow}>ADD DEBIT</Button>
      </div>

      {/* CREDIT Modal */}
            <Modal show={showCredit} onHide={handleCreditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Credit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="creditCategory">
              <Form.Label>Enter Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="example: tea"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                autoFocus
              />
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="creditDate">
              <Form.Label>Enter Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="creditAmount">
              <Form.Label>Enter Credit Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="example: 10"
                value={camt}
                onChange={(e) => setCamt(e.target.value)}
              />
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="debitAmount">
              <Form.Label>Enter Debit Amount</Form.Label>
              <Form.Control
                type="number"
                value={0}
                readOnly
                disabled
                placeholder="example: 0"
              />
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="creditStatus">
              <Form.Label>Enter Status</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" disabled>Select status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCreditClose}>
            Close
          </Button>
          <Button variant="primary" onClick={getnm}>
            Save Credit
          </Button>
        </Modal.Footer>
      </Modal>


      {/* DEBIT Modal */}
      <Modal show={showDebit} onHide={handleDebitClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Debit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="debitCategory">
              <Form.Label>Enter Category</Form.Label>
              <Form.Control type="category" 
              placeholder="example: tea" 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="debitDate">
              <Form.Label>Enter Date</Form.Label>
              <Form.Control type="Date" 
              placeholder="" v
              alue={date}
              onChange={(e) => setDate(e.target.value)}
              autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="creditAmount">
             <Form.Label>Enter Credit Amount</Form.Label>
             <Form.Control
               type="number"
               value={0}
               readOnly
               disabled
               placeholder="example: 10"
             />
             </Form.Group>
            <Form.Group className="mb-3" controlId="debitAmount">
              <Form.Label>Enter Debit Amount</Form.Label>
              <Form.Control type="DebitAmount" 
              placeholder="example: 10" 
              value={damt}
              onChange={(e) => setDamt(e.target.value)}
              autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="debitStatus">
             <Form.Label>Enter Status</Form.Label>
             <Form.Select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              >
               <option value="" disabled>Select status</option>
               <option value="Paid">Paid</option>
               <option value="Pending">Pending</option>
             </Form.Select>
             </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDebitClose}>
            Close
          </Button>
          <Button variant="primary" onClick={getnm}>
            Save Debit
          </Button>
        </Modal.Footer>
      </Modal>

    {/* Tables */}
    <div class ="container">
      <div className="tables-wrapper">
        {/* Orange Table */}
        <div className="table-card orange">
          <h3><center>Credit Transactions</center></h3>
          <div className="table-header">
            <input
              type="text"
              className="search-input"
              placeholder="Search by category..."
              value={creditSearchTerm}
              onChange={(e) => setCreditSearchTerm(e.target.value.toLowerCase())}
            />
          </div>
          <div className="table-container">
            <table className="transactions-table" id="orange-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Credited Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
               <tbody>
                   {creditedTransactions.length > 0 ? (
                      creditedTransactions
                        .filter((txn) =>
                          txn.category.toLowerCase().includes(creditSearchTerm)
                        )
                        .map((txn, index) => (
                          <tr key={index}>
                            <td>{txn.category}</td>
                            <td>{txn.date}</td>
                            <td>{txn.camt}</td>
                            <td>
                              <span className={`status-badge ${txn.status.toLowerCase()}`}>
                                {txn.status}
                              </span>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">No transactions found.</td>
                      </tr>
                    )}
               </tbody>
            </table>
          </div>
        </div>

        {/* Red Table */}
        <div className="table-card red">
  <h3><center>Debit Transactions</center></h3>
  
  <div className="table-header">
    <input
      type="text"
      className="search-input"
      placeholder="Search by category..."
      value={debitSearchTerm}
      onChange={(e) => setDebitSearchTerm(e.target.value.toLowerCase())}
    />
  </div>

  <div className="table-container">
    <table className="transactions-table" id="red-table">
      <thead>
        <tr>
          <th>Category</th>
          <th>Date</th>
          <th>Debited Amount</th>
          <th>Status</th>
        </tr>
      </thead>
         <tbody>
              {debitedTransactions.length > 0 ? (
                debitedTransactions
                  .filter((txn) =>
                    txn.category.toLowerCase().includes(debitSearchTerm)
                  )
                  .map((txn, index) => (
                    <tr key={index}>
                      <td>{txn.category}</td>
                      <td>{txn.date}</td>
                      <td>{txn.damt}</td>
                      <td>
                        <span className={`status-badge ${txn.status.toLowerCase()}`}>
                          {txn.status}
                        </span>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No transactions found.</td>
                </tr>
              )}
       </tbody>
    </table>
  </div>
</div>
      </div>
    </div>




    </>
  );
}

export default Dbord;