
import db from '../db';

let myData = {
  Status: null,
  RequestTime: null,
  MessageDetails: {
    code:null,
    Message:null
  },
  PayLoad: null
}
const bankdetails = {
  /*
  * Get A Bank detail
  * @param {object} req 
  * @param {object} res
  * @returns {object} bankbranch object
  */


  async getBankDetail(req, res) {
    console.log(req);
    
    const text = 'SELECT * FROM bank_branches WHERE ifsc = $1 LIMIT $2 OFFSET $3';
    const text2 = 'SELECT * FROM users WHERE id = $1 LIMIT 1';
    try {
      
      const { rows } = await db.query(text, [req.params.ifsc, req.params.limit, req.params.offset]);
      const { rows1 } = await db.query(text2, [req.user.id]);
      // console.log(req);
      if(!rows1[0]){
          if (!rows[0]) {
            
            myData.Status = "failure";
            myData.RequestTime = new Date()
            myData.MessageDetails.code = 0;
            myData.MessageDetails.Message = "Bank details not found";
            myData.PayLoad = [];
            
            return res.status(404).send(myData);
          }else{
          myData.Status = "success";
          myData.MessageDetails.code = 1;
          myData.RequestTime = new Date()
          myData.MessageDetails.Message = "fetched";
          myData.PayLoad = rows;

          return res.status(200).send(myData);
        }
      }      
    } catch (error) {
      
      myData.Status = "error";
      myData.RequestTime = new Date()
      myData.MessageDetails.code = -99;
      myData.MessageDetails.Message = JSON.stringify(error);
      myData.PayLoad = [];
      return res.status(400).send(myData)
    }
  },
  async getBranchDetail(req, res) {
    
    const text1 = 'SELECT * FROM bank_branches WHERE bank_name = $1 AND city = $2 LIMIT $3 OFFSET $4 ';
    const text2 = 'SELECT * FROM users WHERE id = $1 LIMIT 1';


    try {
      const { rows } = await db.query(text1, [req.params.bankname, req.params.city, req.params.limit, req.params.offset]);
      const { rows1 } = await db.query(text2, [req.user.id]);
      // console.log(text);
      if(!rows1[0]){
          if (!rows[0]) {
            myData.Status = "failure";
            myData.MessageDetails.code = 0;
            myData.RequestTime = new Date()
            
            myData.MessageDetails.Message = "Bank details not found";
            myData.PayLoad = [];
            return res.status(404).send(myData);
          }else{
          myData.Status = "success";
          myData.RequestTime = new Date()
          myData.MessageDetails.code = 1;
          myData.MessageDetails.Message = "fetched";
          myData.PayLoad = rows;
          return res.status(200).send(myData);
        }
      }
    } catch (error) {
      
      myData.Status = "error";
      myData.MessageDetails.code = -99;
      myData.RequestTime = new Date()
      myData.MessageDetails.Message = JSON.stringify(error);
      myData.PayLoad = [];
      return res.status(400).send(myData)
    }
  }
}

export default bankdetails;