<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Accepted✔</title>
        <style>
           table{
                margin:20px auto;
                border: outset 5px;
                padding: 0px 40px;
                width: fit-content;
                max-width: 50%;
                align-self: center;
            }
            t, comments{
                font-family: monospace;
            }
        </style>
    </head>
    <body>
        <script>
            var f = ['🌑', '🌘', '🌗', '🌖', '🌕', '🌔', '🌓', '🌒'],
                d = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                m = 0;
            function loop() {
                var s = '', x = 0;
                if (!m) {
                    while (d[x] == 4) {
                        x ++;
                    }
                    if (x >= d.length) m = 1;
                    else {
                        d[x] ++;
                    }
                }
                else {
                    while (d[x] == 0) {
                        x ++;
                    }
                    if (x >= d.length) m = 0;
                    else {
                        d[x] ++;
                        if (d[x] == 8) d[x] = 0;
                    }
                }
                d.forEach(function (n) {
                    s += f[n];
                });
                location.hash = s;
                setTimeout(loop, 50);
            }
            loop();
        </script>
        <?php $arr=$_POST; ?>
        <a href="http://n77165va.beget.tech/">Main</a>
        <a href="index.html">Back</a>
        <table>
            <td>
                <h1>You order is Accepted!!!</br>This is your Order:</h1>
                <h2>
                    Name: <t><?=htmlspecialchars($arr[name])?></t></br>
                    Address: <t><?=htmlspecialchars($arr[address])?></t></br>
                    City: <t><?=htmlspecialchars($arr[city])?></t></br>
                    State: <t><?=htmlspecialchars($arr[state])?></t></br>
                    Zip: <t><?=htmlspecialchars($arr[zip])?></t></br>
                    Magazine: <t><?=htmlspecialchars($arr[magazine])?></t></br>
                    Subscription: <t><?=htmlspecialchars($arr[subscription])?></t></br>
                    Additional Comments:</br>
                    <comments style="font-size: medium;"><?php if($arr[comments]!=""){echo "\"".htmlspecialchars($arr[comments])."\"";}?></comments>
                </h2>
            </td>
        </table>
    </body>
</html>