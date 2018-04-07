/*****************************************************************************
* | File      	:	WS1in8LCD
* | Author      :   Waveshare team
* | Function    :	Contorl lcd Show
* | Info        :
*----------------
* |	This version:   V1.0
* | Date        :   2018-02-22
* | Info        :   Basic version
*
******************************************************************************/
let GUI_BACKGROUND_COLOR = LCD_COLOR.WHITE
let FONT_BACKGROUND_COLOR = LCD_COLOR.WHITE
let FONT_FOREGROUND_COLOR = LCD_COLOR.BLACK


//% weight=20 color=#436EEE icon="\uf108"
namespace LCD1IN8 {
    function Swop_AB(Point1: number, Point2: number): void {
        let Temp = 0;
        Temp = Point1;
        Point1 = Point2;
        Point2 = Temp;
    }
        
    //% shim=LCD1IN8::SetWindows
    function SetWindows(Xstart: number, Ystart: number, Xend: number, Yend: number): void{
        return;
    }
    
    //% shim=LCD1IN8::SetCursor
    function SetCursor(x: number, y: number): void{
        return;
    }
    
    //% shim=LCD1IN8::SetColor
    function SetColor(Color: number, x: number, y: number): void{
        return;
    }
    
    //% shim=LCD1IN8::GetFontData
    function GetFontData(chfont: CHARFONT, Offset: number): number{
        return;
    }
    
    //% shim=LCD1IN8::GetFontHeight
    function GetFontHeight(chfont: CHARFONT): number{
        return;
    }
    
    //% shim=LCD1IN8::GetFontWidth
    function GetFontWidth(chfont: CHARFONT): number{
        return;
    }
    
	//% blockId=LCD_Init
    //% blockGap=8
    //% block="LCD1IN8 Init"
    //% shim=LCD1IN8::Init
    //% weight=200
    export function Init(): void{
        return;
    }
    
    //% blockId=Get_Color
    //% blockGap=8
    //% block="%Color"
    //% weight=199
    export function Get_Color(Color: LCD_COLOR): number{
        return Color;
    }
    
    //% blockId=DrawPoint
    //% blockGap=8
    //% block="Draw Point|x %x|y %y|Color %Color|Point Size %Dot"
    //% x.min=0 x.max=159 y.min=0 y.max=127
    //% Color.min=0 Color.max=65535
    //% shim=LCD1IN8::DrawPoint
    //% weight=190
    export function DrawPoint(x: number, y: number, Color: number, Dot: DOT_PIXEL): void{
        return;
    }

    /*
    * Draw a line of arbitrary slope
    */
    //% blockId=DrawLine
    //% blockGap=8
    //% block="Draw Line|Xstart %Xstart|Ystart %Ystart|Xend %Xend|Yend %Yend|Color %Color|Line width %Line_width|Line Style %Line_Style"
    //% Xstart.min=0 Xstart.max=159 Ystart.min=0 Ystart.max=127
    //% Xend.min=0 Xend.max=159 Yend.min=0 Yend.max=127
    //% Color.min=0 Color.max=65535
    //% weight=180
    export function DrawLine(Xstart: number, Ystart: number, Xend: number, Yend: number, Color: number, Line_width: DOT_PIXEL, Line_Style: LINE_STYLE): void {
        if (Xstart > Xend)
            Swop_AB(Xstart, Xend);
        if (Ystart > Yend)
            Swop_AB(Ystart, Yend);

        let Xpoint = Xstart;
        let Ypoint = Ystart;
        let dx = Xend - Xstart >= 0 ? Xend - Xstart : Xstart - Xend;
        let dy = Yend - Ystart <= 0 ? Yend - Ystart : Ystart - Yend;

        // Increment direction, 1 is positive, -1 is counter;
        let XAddway = Xstart < Xend ? 1 : -1;
        let YAddway = Ystart < Yend ? 1 : -1;

        //Cumulative error
        let Esp = dx + dy;
        let Line_Style_Temp = 0;

        for (; ;) {
            Line_Style_Temp++;
            //Painted dotted line, 2 point is really virtual
            if (Line_Style == LINE_STYLE.LINE_DOTTED && Line_Style_Temp % 3 == 0) {
                DrawPoint(Xpoint, Ypoint, GUI_BACKGROUND_COLOR, Line_width);
                Line_Style_Temp = 0;
            } else {
                DrawPoint(Xpoint, Ypoint, Color, Line_width);
            }
            if (2 * Esp >= dy) {
                if (Xpoint == Xend) break;
                Esp += dy
                Xpoint += XAddway;
            }
            if (2 * Esp <= dx) {
                if (Ypoint == Yend) break;
                Esp += dx;
                Ypoint += YAddway;
            }
        }
    }
    
    /*
    * Draw a rectangle
	*/
    //% blockId=DrawRectangle
    //% blockGap=8
    //% block="Draw Rectangle|Xstart2 %Xstart2|Ystart2 %Ystart2|Xend2 %Xend2|Yend2 %Yend2|Color %Color|Filled %Filled |Line width %Dot_Pixel"
    //% Xstart2.min=0 Xstart2.max=159 Ystart2.min=0 Ystart2.max=127 
    //% Xend2.min=0 Xend2.max=159 Yend2.min=0 Yend2.max=127
    //% Color.min=0 Color.max=65535
    //% weight=170
    export function DrawRectangle(Xstart2: number, Ystart2: number, Xend2: number, Yend2: number, Color: number, Filled: DRAW_FILL, Dot_Pixel: DOT_PIXEL): void {
        if (Xstart2 > Xend2)
            Swop_AB(Xstart2, Xend2);
        if (Ystart2 > Yend2)
            Swop_AB(Ystart2, Yend2);

        let Ypoint = 0;
        if (Filled) {
            SetWindows(Xstart2, Ystart2, Xend2, Yend2);
            SetColor(Color, Yend2 - Ystart2, Xend2 - Xstart2);
        } else {
            DrawLine(Xstart2, Ystart2, Xend2, Ystart2, Color, Dot_Pixel, LINE_STYLE.LINE_SOLID);
            DrawLine(Xstart2, Ystart2, Xstart2, Yend2, Color, Dot_Pixel, LINE_STYLE.LINE_SOLID);
            DrawLine(Xend2, Yend2, Xend2, Ystart2, Color, Dot_Pixel, LINE_STYLE.LINE_SOLID);
            DrawLine(Xend2, Yend2, Xstart2, Yend2, Color, Dot_Pixel, LINE_STYLE.LINE_SOLID);
        }
    }

    /*
	* Use the 8-point method to draw a circle of the
	*/
    //% blockId=DrawCircle
    //% blockGap=8
    //% block="Draw Circle|X_Center %X_Center |Y_Center %Y_Center |Radius %Radius|Color %Color|Filled %Draw_Fill|Line width %Dot_Pixel "
    //% X_Center.min=0 X_Center.max=159 
    //% Y_Center.min=0 Y_Center.max=63 
    //% Radius.min=0 Radius.max=63 
    //% Color.min=0 Color.max=65535
    //% weight=160
    export function DrawCircle(X_Center: number, Y_Center: number, Radius: number, Color: number, Draw_Fill: DRAW_FILL, Dot_Pixel: DOT_PIXEL): void {
        //Draw a circle from(0, R) as a starting point
        let XCurrent = 0;
        let YCurrent = Radius;

        //Cumulative error,judge the next point of the logo
        let Esp = 3 - (Radius << 1);

        let sCountY = 0;
        if (Draw_Fill == DRAW_FILL.DRAW_FULL) {
            while (XCurrent <= YCurrent) { //Realistic circles
                for (sCountY = XCurrent; sCountY <= YCurrent; sCountY++) {
                    DrawPoint(X_Center + XCurrent, Y_Center + sCountY, DOT_PIXEL.DOT_PIXEL_1, Color);             //1
                    DrawPoint(X_Center - XCurrent, Y_Center + sCountY, DOT_PIXEL.DOT_PIXEL_1, Color);             //2
                    DrawPoint(X_Center - sCountY, Y_Center + XCurrent, DOT_PIXEL.DOT_PIXEL_1, Color);             //3
                    DrawPoint(X_Center - sCountY, Y_Center - XCurrent, DOT_PIXEL.DOT_PIXEL_1, Color);             //4
                    DrawPoint(X_Center - XCurrent, Y_Center - sCountY, DOT_PIXEL.DOT_PIXEL_1, Color);             //5
                    DrawPoint(X_Center + XCurrent, Y_Center - sCountY, DOT_PIXEL.DOT_PIXEL_1, Color);             //6
                    DrawPoint(X_Center + sCountY, Y_Center - XCurrent, DOT_PIXEL.DOT_PIXEL_1, Color);             //7
                    DrawPoint(X_Center + sCountY, Y_Center + XCurrent, DOT_PIXEL.DOT_PIXEL_1, Color);
                }
                if (Esp < 0)
                    Esp += 4 * XCurrent + 6;
                else {
                    Esp += 10 + 4 * (XCurrent - YCurrent);
                    YCurrent--;
                }
                XCurrent++;
            }
        } else { //Draw a hollow circle
            while (XCurrent <= YCurrent) {
                DrawPoint(X_Center + XCurrent, Y_Center + YCurrent, Dot_Pixel, Color);             //1
                DrawPoint(X_Center - XCurrent, Y_Center + YCurrent, Dot_Pixel, Color);             //2
                DrawPoint(X_Center - YCurrent, Y_Center + XCurrent, Dot_Pixel, Color);             //3
                DrawPoint(X_Center - YCurrent, Y_Center - XCurrent, Dot_Pixel, Color);             //4
                DrawPoint(X_Center - XCurrent, Y_Center - YCurrent, Dot_Pixel, Color);             //5
                DrawPoint(X_Center + XCurrent, Y_Center - YCurrent, Dot_Pixel, Color);             //6
                DrawPoint(X_Center + YCurrent, Y_Center - XCurrent, Dot_Pixel, Color);             //7
                DrawPoint(X_Center + YCurrent, Y_Center + XCurrent, Dot_Pixel, Color);             //0

                if (Esp < 0)
                    Esp += 4 * XCurrent + 6;
                else {
                    Esp += 10 + 4 * (XCurrent - YCurrent);
                    YCurrent--;
                }
                XCurrent++;
            }
        }
    }

}