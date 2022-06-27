<?php
	session_start();
	if(!isset($_SESSION['username']) && !isset($_SESSION['password'])){
		header('location:login.php');
	}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Mark Edison Rosario">
    <title>Survey Form</title>
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>
    <div id="surveyMainContainer">
        <h2>Customer Satisfaction Survey</h2>
        <div id="greeting">
            <p>
                <?php echo "Hi <b>{$_SESSION['username']}</b>!";?>
            </p>
            <p>Can you help us improve our services by answering a short survey?</p>
        </div>
        <div id="buttons">
            <button id="start" onclick="start();">OKAY, LET'S START</button>
            <button id="exit" onclick="location.href='./logout.php';">LOGOUT</button>
        </div>
    </div>
    <div id="surveyContainer">
        <div id="header">
            <h3>Hello, <?php echo "{$_SESSION['username']}!";?></h3>
            <button id="exit" onclick="location.href='./logout.php';">LOGOUT</button>
        </div>
        <div id="content">
            <div id="instructions">
                <h2>Instructions</h2>
                <div class="info">To answer the survey, rate each given statements using stars ⭐ where:</div>
                <div class="info">
                    <div>5 ⭐ = Excellent </div>
                    <div>4 ⭐ = Good </div>
                    <div>3 ⭐ = Average </div>
                    <div>2 ⭐ = Poor </div>
                    <div>1 ⭐ = Very Poor </div>
                </div>
            </div>
            <div id="quest_ans">
                <!-- 1 -->
                <div class="question">
                    <h2>#1</h2>
                    <div class="stmt">
                        How do you rate the response time of our sales representatives?
                    </div>
                    <div class="stars" id="star1">
                        <input type="radio" name="rating" value="1" />
                        <input type="radio" name="rating" value="2" />
                        <input type="radio" name="rating" value="3" />
                        <input type="radio" name="rating" value="4" />
                        <input type="radio" name="rating" value="5" />
                        <i></i>
                    </div>
                </div>
                <!-- 2 -->
                <div class="question">
                    <h2>#2</h2>
                    <div class="stmt">
                        How do you rate our customer communications?
                    </div>
                    <div class="stars" id="star2">
                        <input type="radio" name="rating" value="1" />
                        <input type="radio" name="rating" value="2" />
                        <input type="radio" name="rating" value="3" />
                        <input type="radio" name="rating" value="4" />
                        <input type="radio" name="rating" value="5" />
                        <i></i>
                    </div>
                </div>
                <!-- 3 -->
                <div class="question">
                    <h2>#3</h2>
                    <div class="stmt">
                        How would you rate the product knowledge of our order desk/inside sales representatives?
                    </div>
                    <div class="stars" id="star3">
                        <input type="radio" name="rating" value="1" />
                        <input type="radio" name="rating" value="2" />
                        <input type="radio" name="rating" value="3" />
                        <input type="radio" name="rating" value="4" />
                        <input type="radio" name="rating" value="5" />
                        <i></i>
                    </div>
                </div>
                <!-- 4 -->
                <div class="question">
                    <h2>#4</h2>
                    <div class="stmt">
                        How would you rate the product knowledge of our order outside sales representatives?
                    </div>
                    <div class="stars" id="star4">
                        <input type="radio" name="rating" value="1" />
                        <input type="radio" name="rating" value="2" />
                        <input type="radio" name="rating" value="3" />
                        <input type="radio" name="rating" value="4" />
                        <input type="radio" name="rating" value="5" />
                        <i></i>
                    </div>
                </div>
                <!-- 5 -->
                <div class="question">
                    <h2>#5</h2>
                    <div class="stmt">
                        How would you rate the product knowledge of our order counter/showroom sales representatives?
                    </div>
                    <div class="stars" id="star5">
                        <input type="radio" name="rating" value="1" />
                        <input type="radio" name="rating" value="2" />
                        <input type="radio" name="rating" value="3" />
                        <input type="radio" name="rating" value="4" />
                        <input type="radio" name="rating" value="5" />
                        <i></i>
                    </div>
                </div>
                <!-- ANSWER TAB -->
                <div id="answer">
                    <h3>Answers</h3>
                    <div id="answer_list"></div>
                </div>
                <div id="thankyou">
                    <h2>Thank you for completing the survey.</h2>
                    <div class="info">
                        We are very appreciative of the time you have taken to answer our survey.
                        and commit to utilizing the information gained to contemplate and implement worthwhile improvements on our services.
                    </div>
                </div>
            </div>
        </div>
        <div id="footer">
            <button id="next" onclick="next();">NEXT</button>
        </div>
    </div>
    <script src="./js/script.js"></script>
</body>
</html>