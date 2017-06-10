<!doctype html>
<html>
    <head>
        <title>Freshdesk</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href = "bootstrap/css/bootstrap.css">
        <link rel="stylesheet" href = "bootstrap/css/bootstrap-xxs.css">
        <link rel="stylesheet" href = "css/reboot.css">
        <link rel="stylesheet" href = "css/global.css">
        <link rel="stylesheet" href = "css/landing.css">
        <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700|Prompt:100,200,300,400,500,600,700,800,900&amp;subset=thai" rel="stylesheet">
        <link href="https://file.myfontastic.com/G8KRYFNq9QatpXE9t32usG/icons.css" rel="stylesheet">
    </head>
    <body>
        <div class="landing-header-wrapper">
            <div class="container-fluid landing-header">
                <div class="header-logo">
                    <a href="http://freshdesk-alpha.appspot.com" class="no-decor">
                        Freshdesk<span>alpha</span>
                    </a>
                </div>
                <div class="header-content">
                    <div>
                        <h1>ค้นหาพื้นที่ประชุม ทำงาน รอบตัวคุณ</h1>
                        <!--ทำงานอย่างมีประสิทธิภาพ ในบรรยากาศสบายๆ-->
                    </div>
                    <div class="header-search col-lg-8">
                        <div class="input-group">
                            <div class="header-select form-control rounded-form-control">
                                <div class="header-search-label small">ฉันเป็น</div>
                                <select name="title">
                                    <option value="freelance">อาชีพอิสระ</option>
                                    <option value="student">นักเรียน นักศึกษา</option>
                                    <option value="employee">พนักงานบริษัท</option>
                                    <option value="business-man">นักธุรกิจ</option>
                                    <option value="other">อื่นๆ</option>
                                </select>
                            </div>
                            <div class="header-select form-control rounded-form-control">
                                <div class="header-search-label small">ต้องการพื้นที่สำหรับ</div>
                                <select name="need">
                                    <option value="meeting">ประชุมคุยงาน</option>
                                    <option value="group-work">ทำงานเป็นกลุ่ม</option>
                                    <option value="personal-work">ทำงานส่วนตัว</option>
                                    <option value="reading">อ่านหนังสือ</option>
                                    <option value="teaching">สอนหนังสือ</option>
                                    <option value="other">อื่นๆ</option>
                                </select>
                            </div>
                            <span class="input-group-btn">
                                <button class="btn btn-primary" type="button" id="searchbtn"  data-toggle="modal" data-target="#locmodal">ค้นหา</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid landing-space">
            <div class="container-fluid landing-location">
                <h3>เลือกพื้นที่ที่คุณต้องการ</h3>
                <div class="landing-location-row">
                    <a class="foot-loc col-md-3 col-sm-6 col-xs-6 col-xxs-12 location-col" href="phayathai.php" data-loc=1>
                        <div class="location-block" style="background-image:url('loc1.jpg')">
                            <h5 class="location-block-text">
                                พญาไท
                            </h5>
                        </div>
                    </a>
                    <a class="foot-loc col-md-3 col-sm-6 col-xs-6 col-xxs-12 location-col" data-toggle="modal" data-target="#namodal" data-loc=2>
                        <div class="location-block" style="background-image:url('loc2.jpg')">
                            <h5 class="location-block-text">
                                สยาม
                            </h5>
                        </div>
                    </a>
                    <a class="foot-loc col-md-3 col-sm-6 col-xs-6 col-xxs-12 location-col" data-toggle="modal" data-target="#namodal" data-loc=3>
                        <div class="location-block" style="background-image:url('loc3.jpg')">
                            <h5 class="location-block-text">
                                พระรามเก้า
                            </h5>
                        </div>
                    </a>
                    <a class="foot-loc col-md-3 col-sm-6 col-xs-6 col-xxs-12 location-col" data-toggle="modal" data-target="#namodal" data-loc=4>
                        <div class="location-block" style="background-image:url('loc4.jpg')">
                            <h5 class="location-block-text">
                                ฮโศก
                            </h5>
                        </div>
                    </a>
                </div>   
            </div>
        </div>
        <input type="hidden" name="curloc" value=0>
        <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
        <script src="bootstrap/js/bootstrap.min.js"></script>
        <script src="js/landing.js"></script>
    </body>
</html>