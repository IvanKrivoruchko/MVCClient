using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace MVCClient.Controllers
{
 
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }


        [HttpGet]
        public Object GetWeekData()
        {
            var data = new Data();//get from API
            var returnData = JsonConvert.SerializeObject(data);
            var r2 = Json(data, JsonRequestBehavior.AllowGet);

            return returnData;
        }


        [HttpPost]
        public Object SendWeekData(string data)
        {
            //Сразу отправлять на API
            List<Data> listData = (List<Data>)JsonConvert.DeserializeObject(data);


            var returnData = JsonConvert.SerializeObject("success");
            return returnData;
        }
    }


    public class Data
    {
        public int ActivitiesId;
        public string ActivitiesName;
        public int Mo;
        public int Tu;
        public int We;
        public int Th;
        public int Fr;
        public int Sa;
        public int Su;
    }

}
