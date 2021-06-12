/*
*BZ00033           130621     Export excel  for user


************************************************************************
*/
import  excel from 'node-excel-export';
import dbConnect from '../../../../utils/dbConnect';
import User from "../../../model/user";
import moment from 'moment';//BZ00029
import nodeExcel from 'excel-export-next';//BZ00029

// You can define styles as json object
const styles = {
  headerDark: {
    fill: {
      fgColor: {
        rgb: 'FF000000'
      }
    },
    font: {
      color: {
        rgb: 'FFFFFFFF'
      },
      sz: 14,
      bold: true,
      underline: true
    }
  },
  cellPink: {
    fill: {
      fgColor: {
        rgb: 'FFFFCCFF'
      }
    }
  },
  cellGreen: {
    fill: {
      fgColor: {
        rgb: 'FF00FF00'
      }
    }
  }
};
 
//Array of objects representing heading rows (very top)
const heading = [
  // [{value: 'a1', style: styles.headerDark}, {value: 'b1', style: styles.headerDark}, {value: 'c1', style: styles.headerDark}],
  // ['a2', 'b2', 'c2'] // <-- It can be only values
];
 
//Here you specify the export structure
const specification = {
    number: { // <- the key should match the actual data key
    displayName: 'number', // <- Here you specify the column header
    headerStyle: styles.headerDark, // <- Header style
    cellStyle: function(value, row) { // <- style renderer function
      // if the status is 1 then color in green else color in red
      // Notice how we use another cell value to style the current one
      return (row.number == 1) ? styles.cellGreen : {fill: {fgColor: {rgb: 'FFFF0000'}}}; // <- Inline cell style is possible 
    },
    width: 120 // <- width in pixels
  },
  userName: {
    displayName: 'userName',
    headerStyle: styles.headerDark,
    cellStyle: styles.cellPink, // <- Cell style
    width: 220 // <- 
  },
  createAt: {
    displayName: 'createAt',
    headerStyle: styles.headerDark,
    cellStyle: styles.cellPink, // <- Cell style
    width: 220 // <- width in pixels
  },
  userRole: {
    displayName: 'userRole',
    headerStyle: styles.headerDark,
    cellStyle: styles.cellPink, // <- Cell style
    width: 220 // <- width in pixels
  },
  userType: {
    displayName: 'userType',
    headerStyle: styles.headerDark,
    cellStyle: styles.cellPink, // <- Cell style
    width: 220 // <- width in pixels
  }
}

// The data set should have the following shape (Array of Objects)
// The order of the keys is irrelevant, it is also irrelevant if the
// dataset contains more fields as the report is build based on the
// specification provided above. But you should have all the fields
// that are listed in the report specification


 
// Define an array of merges. 1-1 = A:1
// The merges are independent of the data.
// A merge will overwrite all data _not_ in the top-left cell.
const merges = [
  { start: { row: 1, column: 1 }, end: { row: 1, column: 10 } },
  { start: { row: 2, column: 1 }, end: { row: 2, column: 5 } },
  { start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }
]
 
// Create the excel report.
// This function will return Buffer
const exportUserForExcel = async({res,req,body: { user_cookies , check_token }}) => {
    // await dbConnect(); 
    // let data=[];
    // const dataset  = await User.find({}).sort({
    //     createAt: "desc",
    //   });
    //   const user = await User.find({}) 
    //   .sort({
    //       createAt: "desc",
    //     });
    //   //   console.log("req.query",req.query.page);
    //   //   console.log("req.query",user);
    //     for(let i=0 ;i<user.length;i++){
    //         data.push(
    //           {
    //               _id:user[i]._id,
    //               userName:user[i].email,
    //               number:i+1,
    //               userRole:user[i].userRole,
    //               img:user[i].img,
    //               createAt: moment(user[i].createAt).format('DD-MM-YYYY'),//BZ00029
    //               userType:user[i].userType
    //           }
    //       )
    //    }
      

    // const report = excel.buildExport(
    //     [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
    //       {
    //         name: 'Report', // <- Specify sheet name (optional)
    //         heading: heading, // <- Raw heading array (optional)
    //        // merges: merges, // <- Merge cell ranges
    //         specification: specification, // <- Report specification
    //         data: data // <-- Report data
    //       }
    //     ]
    //   );
    //   // You can then return this straightr
      
    //   res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');  
    //   res.send(report);  
    //   res.end();
    var conf ={
      stylesXmlFile:"",
      name:"",
      cols:[],
      rows:[]
    };
    // conf.stylesXmlFile = "styles.xml";
      conf.name = "mysheet";
      conf.cols = [{
      caption:'string',
          type:'string',
          beforeCellWrite:function(row, cellData){
         return cellData.toUpperCase();
      },
          width:28.7109375
    },{
      caption:'date',
      type:'date',
      beforeCellWrite:function(){
        return function(row, cellData, eOpt){
                if (eOpt.rowNum%2){
                  eOpt.styleIndex = 1;
                }  
                else{
                  eOpt.styleIndex = 2;
                }
                  if (cellData === null){
                    eOpt.cellType = 'string';
                    return 'N/A';
                  } else
                    return (cellData) / (24 * 60 * 60 * 1000);
        } 
      }()
    },{
      caption:'bool',
      type:'bool'
    },{
      caption:'number',
       type:'number'				
      }];
      conf.rows = [
       ['pi', new Date(Date.UTC(2013, 4, 1)), true, 3.14],
       ["e", new Date(2012, 4, 1), false, 2.7182],
          ["M&M<>'", new Date(Date.UTC(2013, 6, 9)), false, 1.61803],
          ["null date", null, true, 1.414]  
      ];
      var result = nodeExcel.execute(conf);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats');
      res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
      res.end(result, 'binary');
}
export default exportUserForExcel;
 