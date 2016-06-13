
var friend=function(){
    var me=true;
    var chessBord=[];
    var win=[];
    var mywin=[];
    var computerwin=[];
    var over=false;
    for(var i=0;i<15;i++)
    {
        chessBord[i]=[];
        for(var j=0;j<15;j++){
            chessBord[i][j]=0;
        }
    }

    for(var i=0;i<15;i++)
    {
        win[i]=[];
        for(var j=0;j<15;j++)
        {
            win[i][j]=[];
        }
    }
//赢法数组
    var count=0;
    for(var i=0;i<15;i++)
    {
        for(var j=0;j<11;j++)
        {
            for(var k=0;k<5;k++)
            {
                win[i][j+k][count]=true;
            }
            count++;
        }
    }
    for(var i=0;i<11;i++)
    {
        for(var j=0;j<15;j++)
        {
            for(var k=0;k<5;k++)
            {
                win[i+k][j][count]=true;
            }
            count++;
        }
    }
    for(var i=0;i<11;i++)
    {
        for(var j=0;j<11;j++)
        {
            for(var k=0;k<5;k++)
            {
                win[i+k][j+k][count]=true;
            }
            count++;
        }
    }
    for(var i=0;i<11;i++)
    {
        for(var j=14;j>3;j--)
        {
            for(var k=0;k<5;k++)
            {
                win[i+k][j-k][count]=true;
            }
            count++;
        }
    }
    console.log(count);
    for(var i=0;i<count;i++){
        mywin[i]=0;
        computerwin[i]=0;
    }
    var main=document.querySelector('.main');
    main.style.display='block';
    var chos=document.querySelector('.chos');
    chos.style.display='none';
    var chess=document.getElementById('chess');

    var context=chess.getContext('2d');
    context.strokeStyle="#bfbfbf";
    var logo=new Image();
    logo.src="image/background1.jpg";
    logo.onload=function(){
        context.drawImage(logo,0,0,450,450);
        drawchessground();
    };
    var drawchessground=function(){
        for(var i=15;i<=435;i=i+30)
        {
            context.moveTo(i,15);
            context.lineTo(i,435);
            context.moveTo(15,i);
            context.lineTo(435,i);
            context.stroke();
        }
    };
    var onestep=function(i,j,me){
        context.beginPath();
        context.arc(15+i*30,15+j*30,11,0,2*Math.PI);
        var gradient=context.createRadialGradient(15+i*30+2,15+j*30-2,0,15+i*30,15+j*30,11);
        if(me){

            gradient.addColorStop(0,"#0a0a0a");
            gradient.addColorStop(1,"#636766");

        }
        else
        {
            gradient.addColorStop(0,"#d1d1d1");
            gradient.addColorStop(1,"#f9f9f9");
        }
        context.fillStyle=gradient;
        context.fill();
    };
    chess.onclick=function(e) {
        if (over) {
            return;
        }
        var x = e.offsetX;
        var y = e.offsetY;
        var i = Math.floor(x / 30);
        var j = Math.floor(y / 30);
        if (chessBord[i][j] == 0) {
            onestep(i, j, me);
            if (me) {
                chessBord[i][j] = 1;
            }
            else {
                chessBord[i][j] = 2;
            }

            // chose(i,j);
            for (var k = 0; k < count; k++) {
                if (win[i][j][k]) {
                    if (me) {
                        mywin[k]++;
                        computerwin[k] = 6;
                        if (mywin[k] == 5) {
                            window.alert("black win!!!");
                            over = true;
                        }
                    }
                    else {
                        computerwin[k]++;
                        mywin[k] = 6;
                        if (computerwin[k] == 5) {
                            window.alert("white win!!!");
                            over = true;
                        }
                    }

                }
            }

            me = !me;
        }

//var chose=function(i,j){
//    if(chessBord[i][j]==chessBord[i+1][j]&&chessBord[i][j]==chessBord[i+2][j]&&chessBord[i][j]==chessBord[i+3][j]&&chessBord[i][j]==chessBord[i+4][j]||
//        chessBord[i][j]==chessBord[i+1][j]&&chessBord[i][j]==chessBord[i+2][j]&&chessBord[i][j]==chessBord[i+3][j]&&chessBord[i][j]==chessBord[i-1][j]||
//        chessBord[i][j]==chessBord[i+1][j]&&chessBord[i][j]==chessBord[i+2][j]&&chessBord[i][j]==chessBord[i-2][j]&&chessBord[i][j]==chessBord[i-1][j]||
//        chessBord[i][j]==chessBord[i+1][j]&&chessBord[i][j]==chessBord[i-3][j]&&chessBord[i][j]==chessBord[i-2][j]&&chessBord[i][j]==chessBord[i-1][j]||
//        chessBord[i][j]==chessBord[i-4][j]&&chessBord[i][j]==chessBord[i-3][j]&&chessBord[i][j]==chessBord[i-2][j]&&chessBord[i][j]==chessBord[i-1][j]||
//        chessBord[i][j]==chessBord[i][j+1]&&chessBord[i][j]==chessBord[i][j+2]&&chessBord[i][j]==chessBord[i][j+3]&&chessBord[i][j]==chessBord[i][j+4]||
//        chessBord[i][j]==chessBord[i][j+1]&&chessBord[i][j]==chessBord[i][j+2]&&chessBord[i][j]==chessBord[i][j+3]&&chessBord[i][j]==chessBord[i][j-1]||
//        chessBord[i][j]==chessBord[i][j+1]&&chessBord[i][j]==chessBord[i][j+2]&&chessBord[i][j]==chessBord[i][j-2]&&chessBord[i][j]==chessBord[i][j-1]||
//        chessBord[i][j]==chessBord[i][j+1]&&chessBord[i][j]==chessBord[i][j-3]&&chessBord[i][j]==chessBord[i][j-2]&&chessBord[i][j]==chessBord[i][j-1]||
//        chessBord[i][j]==chessBord[i][j-4]&&chessBord[i][j]==chessBord[i][j-3]&&chessBord[i][j]==chessBord[i][j-2]&&chessBord[i][j]==chessBord[i][j-1] ||
//        chessBord[i][j]==chessBord[i+1][j-1]&&chessBord[i][j]==chessBord[i+2][j-2]&&chessBord[i][j]==chessBord[i+3][j-3]&&chessBord[i][j]==chessBord[i+4][j-4]||
//        chessBord[i][j]==chessBord[i+1][j-1]&&chessBord[i][j]==chessBord[i+2][j-2]&&chessBord[i][j]==chessBord[i+3][j-3]&&chessBord[i][j]==chessBord[i-1][j+1]||
//        chessBord[i][j]==chessBord[i+1][j-1]&&chessBord[i][j]==chessBord[i+2][j-2]&&chessBord[i][j]==chessBord[i-2][j+2]&&chessBord[i][j]==chessBord[i-1][j+1]||
//        chessBord[i][j]==chessBord[i+1][j-1]&&chessBord[i][j]==chessBord[i-3][j+3]&&chessBord[i][j]==chessBord[i-2][j+2]&&chessBord[i][j]==chessBord[i-1][j+1]||
//        chessBord[i][j]==chessBord[i-4][j+4]&&chessBord[i][j]==chessBord[i-3][j+3]&&chessBord[i][j]==chessBord[i-2][j+2]&&chessBord[i][j]==chessBord[i-1][j+1]||
//        chessBord[i][j]==chessBord[i+1][j+1]&&chessBord[i][j]==chessBord[i+2][j+2]&&chessBord[i][j]==chessBord[i+3][j+3]&&chessBord[i][j]==chessBord[i+4][j+4]||
//        chessBord[i][j]==chessBord[i+1][j+1]&&chessBord[i][j]==chessBord[i+2][j+2]&&chessBord[i][j]==chessBord[i+3][j+3]&&chessBord[i][j]==chessBord[i-1][j-1]||
//        chessBord[i][j]==chessBord[i+1][j+1]&&chessBord[i][j]==chessBord[i+2][j+2]&&chessBord[i][j]==chessBord[i-2][j-2]&&chessBord[i][j]==chessBord[i-1][j-1]||
//        chessBord[i][j]==chessBord[i+1][j+1]&&chessBord[i][j]==chessBord[i-3][j-3]&&chessBord[i][j]==chessBord[i-2][j-2]&&chessBord[i][j]==chessBord[i-1][j-1]||
//        chessBord[i][j]==chessBord[i-4][j-4]&&chessBord[i][j]==chessBord[i-3][j-3]&&chessBord[i][j]==chessBord[i-2][j-2]&&chessBord[i][j]==chessBord[i-1][j-1])
//
//    {
//        if(chessBord[i][j]==1)
//        {
//            alert("black win!!!");
//        }
//        if(chessBord[i][j]==2)
//        {
//            alert("white win!!!");
//        }
//    }
//};}
    }
    };
var computer=function(){
    var me=true;
    var chessBord=[];
    var win=[];
    var mywin=[];
    var computerwin=[];
    var over=false;
    for(var i=0;i<15;i++)
    {
        chessBord[i]=[];
        for(var j=0;j<15;j++){
            chessBord[i][j]=0;
        }
    }

    for(var i=0;i<15;i++)
    {
        win[i]=[];
        for(var j=0;j<15;j++)
        {
            win[i][j]=[];
        }
    }
//赢法数组
    var count=0;
    for(var i=0;i<15;i++)
    {
        for(var j=0;j<11;j++)
        {
            for(var k=0;k<5;k++)
            {
                win[i][j+k][count]=true;
            }
            count++;
        }
    }
    for(var i=0;i<11;i++)
    {
        for(var j=0;j<15;j++)
        {
            for(var k=0;k<5;k++)
            {
                win[i+k][j][count]=true;
            }
            count++;
        }
    }
    for(var i=0;i<11;i++)
    {
        for(var j=0;j<11;j++)
        {
            for(var k=0;k<5;k++)
            {
                win[i+k][j+k][count]=true;
            }
            count++;
        }
    }
    for(var i=0;i<11;i++)
    {
        for(var j=14;j>3;j--)
        {
            for(var k=0;k<5;k++)
            {
                win[i+k][j-k][count]=true;
            }
            count++;
        }
    }
    console.log(count);
    for(var i=0;i<count;i++){
        mywin[i]=0;
        computerwin[i]=0;
    }
    var main=document.querySelector('.main');
    main.style.display='block';
    var chos=document.querySelector('.chos');
    chos.style.display='none';
    var chess=document.getElementById('chess');
    var context=chess.getContext('2d');
    context.strokeStyle="#bfbfbf";
    var logo=new Image();
    logo.src="image/background1.jpg";
    logo.onload=function(){
        context.drawImage(logo,0,0,450,450);
        drawchessground();
    };
    var drawchessground=function(){
        for(var i=15;i<=435;i=i+30)
        {
            context.moveTo(i,15);
            context.lineTo(i,435);
            context.moveTo(15,i);
            context.lineTo(435,i);
            context.stroke();
        }
    };
    var onestep=function(i,j,me){
        context.beginPath();
        context.arc(15+i*30,15+j*30,11,0,2*Math.PI);
        var gradient=context.createRadialGradient(15+i*30+2,15+j*30-2,0,15+i*30,15+j*30,11);
        if(me){

            gradient.addColorStop(0,"#0a0a0a");
            gradient.addColorStop(1,"#636766");

        }
        else
        {
            gradient.addColorStop(0,"#d1d1d1");
            gradient.addColorStop(1,"#f9f9f9");
        }
        context.fillStyle=gradient;
        context.fill();
    };
    chess.onclick = function (e) {
            if (over) {
                return;
            }
            if(!me){
                return;
            }
            var x = e.offsetX;
            var y = e.offsetY;
            var i = Math.floor(x / 30);
            var j = Math.floor(y / 30);
            if (chessBord[i][j] == 0) {
                onestep(i, j, me);
                chessBord[i][j] = 1;
                // chose(i,j);
                for (var k = 0; k < count; k++) {
                    if (win[i][j][k]) {
                            mywin[k]++;
                            computerwin[k] = 6;
                            if (mywin[k] == 5) {
                                window.alert("you win!!!");
                                over = true;
                        }
                    }
                }
                if(!over){
                    me = !me;
                    computerAI();
                }
            }

        };
    var computerAI=function(){
      var myScore=[];
        var computerScore=[];
        var max= 0,u= 0,v=0;
        for(var i=0;i<15;i++)
        {
            myScore[i]=[];
            computerScore[i]=[];
            for(var j=0;j<15;j++)
            {
                myScore[i][j]=0;
                computerScore[i][j]=0;
            }
        }
        for(var i=0;i<15;i++)
        {
            for(var j=0;j<15;j++)
            {
                if(chessBord[i][j]==0){
                    for(var k=0;k<count;k++)
                    {
                       if(win[i][j][k]){
                           if(mywin[k]==1)myScore[i][j]+=200;
                           else if(mywin[k]==2)myScore[i][j]+=400;
                           else if(mywin[k]==3)myScore[i][j]+=2000;
                           else if (mywin[k]==4)myScore[i][j]+=10000;
                           if(computerwin[k]==1)computerScore[i][j]+=220;
                           else if(computerwin[k]==2)computerScore[i][j]+=420;
                           else if(computerwin[k]==3)computerScore[i][j]+=2200;
                           else if (computerwin[k]==4)computerScore[i][j]+=20000;
                       }
                    }
                    if(max<myScore[i][j]){
                        max=myScore[i][j];
                        u=i;
                        v=j;
                    }
                    else if(max==myScore[i][j]){
                        if(computerScore[i][j]>computerScore[u][v]){

                            u=i;
                            v=j;
                        }
                    }
                    if(max<computerScore[i][j]){
                        max=computerScore[i][j];
                        u=i;
                        v=j;
                    }
                    else if(max==computerScore[i][j]){
                        if(myScore[i][j]>myScore[u][v]){
                            u=i;
                            v=j;
                        }
                    }

                }
            }
        }
        onestep(u,v,false);
        chessBord[u][v]=2;
        for (var k = 0; k < count; k++) {
            if (win[u][v][k]) {
                computerwin[k]++;
                mywin[k] = 6;
                if (computerwin[k] == 5) {
                    window.alert("computer win!!!");
                    over = true;
                }
            }
        }
        if(!over){
            me = !me;
        }
    }
    };


    /**
     * Created by Dream on 2016/5/12.
     */

