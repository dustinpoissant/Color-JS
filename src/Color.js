var Color = (function(){
  function round3(val){
    return Math.round(val * 1000) / 1000;
  }
  function trimArray(a){
    var b = [];
    for(var i=0; i<a.length; i++) b.push(a[i].trim());
    return b;
  }
  function parseArray(a){
    var b = [];
    for(var i=0; i<a.length; i++) b.push(parseFloat(a[i]));
    return b;
  }
  function RGB2HSL(r, g, b){
    var rgb = {
      r: r / 255,
      g: g / 255,
      b: b / 255
    };
    var max = Math.max(rgb.r, rgb.g, rgb.b);
    var min = Math.min(rgb.r, rgb.g, rgb.b);
    var d = max - min;
    var hsl = {};
    if(d == 0) hsl.h = 0;
    else if(max == rgb.r) hsl.h = 60 * ( ( (rgb.g - rgb.b) / d) % 6);
    else if(max == rgb.g) hsl.h = 60 * ( ( (rgb.b - rgb.r) / d) + 2);
    else if(max == rgb.b) hsl.h = 60 * ( ( (rgb.r - rgb.g) / d) + 4);
    hsl.l = (max + min) / 2;
    if(d == 0) hsl.s = 0;
    else hsl.s = (d / (1 - Math.abs( (2 * hsl.l) - 1) ) );
    hsl.s *= 100;
    hsl.l *= 100;
    hsl.h += 360;
    hsl.h %= 360;
    hsl.h = Math.round(hsl.h);
    hsl.s = Math.round(hsl.s);
    hsl.l = Math.round(hsl.l);
    return hsl;
  };
  function HSL2RGB(hue, saturation, lightness, alpha){
    var h, s, l, c, x, m, rgb = {};
    h = hue % 360;
    s = Math.min(1, Math.max(0, (saturation / 100)));
    l = Math.min(1, Math.max(0, (lightness / 100)));
    c = (1 - Math.abs((2*l)-1)) * s;
    x = c * (1- Math.abs((h / 60) % 2 - 1));
    m = l - (c / 2);
    if(h<=60) rgb = {r:c, g:x, b:0};
    else if(h<=120) rgb = {r:x, g:c, b:0};
    else if(h<=180) rgb = {r:0, g:c, b:x};
    else if(h<=240) rgb = {r:0, g:x, b:c};
    else if(h<=300) rgb = {r:x, g:0, b:c};
    else if(h<=360) rgb = {r:c, g:0, b:x};
    return {
      r: round3((rgb.r + m) * 255),
      g: round3((rgb.g + m) * 255),
      b: round3((rgb.b + m) * 255),
      a: alpha || 1
    };
  };
  function RGB2Hex(r, g, b, a){
    if(a === undefined || a === 1) return "#"+("0"+Math.round(r).toString(16)).slice(-2) + ("0"+Math.round(g).toString(16)).slice(-2) + ("0"+Math.round(b).toString(16)).slice(-2);
    else {
      return "#"+("0"+Math.round(r).toString(16)).slice(-2) + ("0"+Math.round(g).toString(16)).slice(-2) + ("0"+Math.round(b).toString(16)).slice(-2) + ("0"+Math.round(a*255).toString(16)).slice(-2);
    }
  };
  function Hex2RGB(hex){
    var rgb = {};
    if(hex[0] == "#") var hex = hex.substr(1);
    if(hex.length == 3){
      hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2]+"ff";
    } else if(hex.length == 4){
      hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2]+hex[3]+hex[3];
    } else if(hex.length == 6){
      hex += "ff";
    }
    rgb.r = parseInt((hex[0]+hex[1]), 16);
    rgb.g = parseInt((hex[2]+hex[3]), 16);
    rgb.b = parseInt((hex[4]+hex[5]), 16);
    rgb.a = parseInt((hex[6]+hex[7]), 16) / 255;
    return rgb;
  };
  function RGB2HSV(r, g, b){
    var max, min, d, hsv = {};
    var r = r / 255;
    var g = g / 255;
    var b = b / 255;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    d = max - min;
    if(d == 0) hsv.h = 0;
    else if(max == r) hsv.h = 60 * ( ((g-b)/d) % 6 );
    else if(max == g) hsv.h = 60 * ( ((b-r)/d) + 2 );
    else if(max == b) hsv.h = 60 * ( ((r-g)/d) + 4 );
    if(max == 0) hsv.s = 0;
    else hsv.s = (d / max) * 100;
    hsv.v = max * 100;
    if(this.alpha != 1) hsv.a = this.alpha;
    hsv.h = Math.round(hsv.h);
    hsv.s = Math.round(hsv.s);
    hsv.v = Math.round(hsv.v);
    return hsv;
  };
  function HSV2RGB(h, s, v){
    var h, c, x, m;
    h = h % 360;
    c = (v/100) * (s/100);
    x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    m = (v/100) - c;
    if(h <= 60) rgb = {r:c, g:x, b:0};
    else if(h <= 120) rgb = {r:x, g:c, b:0};
    else if(h <= 180) rgb = {r:0, g:c, b:x};
    else if(h <= 240) rgb = {r:0, g:x, b:c};
    else if(h <= 300) rgb = {r:x, g:0, b:c};
    else if(h <= 360) rgb = {r:c, g:0, b:x};
    return {
      r: Math.round((rgb.r + m) * 255),
      g: Math.round((rgb.g + m) * 255),
      b: Math.round((rgb.b + m) * 255)
    }
  };
  function RGB2CMYK(r, g, b){
    var rgb = {}, cmyk = {};
    rgb.r = r / 255;
    rgb.g = g / 255;
    rgb.b = b / 255;
    cmyk.k = 1 - Math.max(rgb.r,rgb.g,rgb.b);
    cmyk.c = (1 - rgb.r - cmyk.k) / (1 - cmyk.k);
    cmyk.m = (1 - rgb.g - cmyk.k) / (1 - cmyk.k);
    cmyk.y = (1 - rgb.b - cmyk.k) / (1 - cmyk.k);
    cmyk.c *= 100;
    cmyk.m *= 100;
    cmyk.y *= 100;
    cmyk.k *= 100;
    if(this.alpha != 1) cmyk.a = this.alpha;
    cmyk.c = round3(cmyk.c);
    cmyk.m = round3(cmyk.m);
    cmyk.y = round3(cmyk.y);
    cmyk.k = round3(cmyk.k);
    return cmyk;
  };
  function CMYK2RGB(c, m, y, k){
    var cmyk = {
      c: c,
      m: m,
      y: y,
      k: k
    };
    cmyk.c /= 100;
    cmyk.m /= 100;
    cmyk.y /= 100;
    cmyk.k /= 100;
    return {
      r: round3(100 * (1-cmyk.c) * (1-cmyk.k)),
      g: round3(100 * (1-cmyk.m) * (1-cmyk.k)),
      b: round3(100 * (1-cmyk.y) * (1-cmyk.k))
    };
  };

  function Color(){
    /*
      Private Members
    */
    var self = this,
        r = 0,
        g = 0,
        b = 0,
        a = 1;

    /*
      Public Members
    */
    /* Formats */
    Object.defineProperty(self, "rgb", {
      get: function(){
        if(a == 1) return "rgb("+[Math.round(r),Math.round(g),Math.round(b)].join(", ")+")";
        else return "rgba("+[Math.round(r),Math.round(g),Math.round(b),a].join(", ")+")";
      },
      set: function(v){
        var parts = parseArray(trimArray(v.split("(")[1].split(")")[0].split(",")));
        r = parts[0];
        g = parts[1];
        b = parts[2];
        a = (parts.length==4)?parts[3]:1;
      },
      enumerable: true
    });
    Object.defineProperty(self, "hex", {
      get: function(){
        return RGB2Hex(r, g, b, (a!=1)?a:undefined);
      },
      set: function(hex){
        var rgb = Hex2RGB(hex);
        r = rgb.r;
        g = rgb.g;
        b = rgb.b;
        a = rgb.a;
      },
      enumerable: true
    });
    Object.defineProperty(self, "hsl", {
      get: function(){
        var hsl = RGB2HSL(r, g, b);
        if(a == 1) return "hsl("+hsl.h+", "+hsl.s+"%, "+hsl.l+"%)";
        else return "hsla("+hsl.h+", "+hsl.s+"%, "+hsl.l+"%, "+a+")";
      },
      set: function(v){
        var parts = parseArray(trimArray(v.split("(")[1].split(")")[0].split(",")));
        var rgb = (parts.length==4)?HSL2RGB(parts[0], parts[1], parts[2], parts[3]):HSL2RGB(parts[0], parts[1], parts[2]);
        r = rgb.r;
        g = rgb.g;
        b = rgb.b;
        a = (parts.length==4)?rgb.a:1;
      },
      enumerable: true
    });
    Object.defineProperty(self, "hsv", {
      get: function(){
        var hsv = RGB2HSV(r, g, b);
        if(a == 1) return "hsv("+hsv.h+", "+hsv.s+"%, "+hsv.v+"%)";
        else return "hsva("+hsv.h+", "+hsv.s+"%, "+hsv.v+"%, "+a+")";
      },
      set: function(v){
        var parts = parseArray(trimArray(v.split("(")[1].split(")")[0].split(",")));
        var rgb = HSV2RGB(parts[0], parts[1], parts[2]);
        r = rgb.r;
        g = rgb.g;
        b = rgb.b;
        a = (parts.length==4)?parts[3]:1;
      },
      enumerable: true
    });
    Object.defineProperty(self, "cmyk", {
      get: function(){
        var cmyk = RGB2CMYK(r, g, b);
        if(a==1) return "cmyk("+[Math.round(cmyk.c), Math.round(cmyk.m), Math.round(cmyk.y), Math.round(cmyk.k)].join("%, ")+"%)";
        else return "cmyka("+[Math.round(cmyk.c), Math.round(cmyk.m), Math.round(cmyk.y), Math.round(cmyk.k)].join("%, ")+"%, "+a+")";
      },
      set: function(v){
        var parts = parseArray(trimArray(v.split("(")[1].split(")")[0].split(",")));
        var rgb = CMYK2RGB(parts[0], parts[1], parts[2], parts[3]);
        r = rgb.r;
        g = rgb.g;
        b = rgb.b;
        a = (parts.length==5)?parts[4]:1;
      },
      enumerable: true
    });

    /* Components */
    Object.defineProperty(self, "red", {
      get: function(){
        return Math.round(r);
      },
      set: function(v){
        r = Math.min(255, Math.max(0, parseInt(v)));
      },
      enumerable: true
    });
    Object.defineProperty(self, "green", {
      get: function(){
        return Math.round(g);
      },
      set: function(v){
        g = Math.min(255, Math.max(0, parseInt(v)));
      },
      enumerable: true
    });
    Object.defineProperty(self, "blue", {
      get: function(){
        return Math.round(b);
      },
      set: function(v){
        b = Math.min(255, Math.max(0, parseInt(v)));
      },
      enumerable: true
    });
    Object.defineProperty(self, "alpha", {
      get: function(){
        return a;
      },
      set: function(v){
        a = Math.max(0, Math.min(1, parseFloat(v)));
      },
      enumerable: true
    });
    Object.defineProperty(self, "hue", {
      get: function(){
        return RGB2HSL(r, g, b).h % 360;
      },
      set: function(v){
        var hsl = RGB2HSL(r,g,b);
        hsl.h = Math.min(360, Math.max(0, parseInt(v)));
        var rgb = HSL2RGB(hsl.h, hsl.s, hsl.l);
        r = rgb.r;
        g = rgb.g;
        b = rgb.b;
      },
      enumerable: true
    });
    Object.defineProperty(self, "saturation", {
      get: function(){
        return RGB2HSL(r, g, b).s;
      },
      set: function(v){
        var hsl = RGB2HSL(r,g,b);
        hsl.s = Math.min(100, Math.max(0, parseFloat(v)));
        var rgb = HSL2RGB(hsl.h, hsl.s, hsl.l);
        r = rgb.r;
        g = rgb.g;
        b = rgb.b;
      },
      enumerable: true
    });
    Object.defineProperty(self, "lightness", {
      get: function(){
        return RGB2HSL(r, g, b).l;
      },
      set: function(v){
        var hsl = RGB2HSL(r, g, b);
        hsl.l = Math.min(100, Math.max(0, parseFloat(v)));
        var rgb = HSL2RGB(hsl.h, hsl.s, hsl.l);
        r = rgb.r;
        g = rgb.g;
        b = rgb.b;
      },
      enumerable: true
    });
    Object.defineProperty(self, "brightness", {
      get: function(){
        var hsv = RGB2HSV(r, g, b);
        return hsv.v;
      },
      set: function(v){
        var hsv = RGB2HSV(r, g, b);
        hsv.v = Math.min(100, Math.max(0, parseInt(v)));
        var rgb = HSV2RGB(hsv.h, hsv.s, hsv.v);
        r = rgb.r;
        g = rgb.g;
        b = rgb.b;
      },
      enumerable: true
    });
    Object.defineProperty(self, "black", {
      get: function(){
        return Math.round(RGB2CMYK(r, g, b).k);
      },
      set: function(v){
        var cmyk = RGB2CMYK(r, g, b);
        cmyk.k = Math.min(100, Math.max(100, parseFloat(v)));
        var rgb = CMYK2RGB(cmyk.c, cmyk.m, cmyk.y, cmyk.k);
        r = rgb.r;
        g = rgb.g;
        b = rgb.b;
      },
      enumerable: true
    });
    Object.defineProperty(self, "white", {
      get: function(){
        return 100 - self.black;
      },
      set: function(v){
        self.black = 100 - parseFloat(v);
      },
      enumerable: true
    });
    Object.defineProperty(self, "cyan", {
      get: function(){
        return Math.round(RGB2CMYK(r, g, b).c);
      },
      set: function(v){
        var cmyk = RGB2CMYK(r, g, b);
        cmyk.c = Math.min(100, Math.max(0, parseFloat(v)));
        var rgb = CMYK2RGB(cmyk.c, cmyk.m, cmyk.y, cmyk.k);
        r = rgb.r;
        g = rgb.g;
        b = rgb.b;
      },
      enumerable: true
    });
    Object.defineProperty(self, "magenta", {
      get: function(){
        return Math.round(RGB2CMYK(r, g, b).m);
      },
      set: function(v){
        var cmyk = RGB2CMYK(r, g, b);
        cmyk.m = Math.min(100, Math.max(0, parseFloat(v)));
        var rgb = CMYK2RGB(cmyk.c, cmyk.m, cmyk.y, cmyk.k);
        r = rgb.r;
        g = rgb.g;
        b = rgb.b;
      },
      enumerable: true
    });
    Object.defineProperty(self, "yellow", {
      get: function(){
        return Math.round(RGB2CMYK(r, g, b).y);
      },
      set: function(v){
        var cmyk = RGB2CMYK(r, g, b);
        cmyk.y = Math.min(100, Math.max(0, parseFloat(v)));
        var rgb = CMYK2RGB(cmyk.c, cmyk.m, cmyk.y, cmyk.k);
        r = rgb.r;
        g = rgb.g;
        b = rgb.b;
      },
      enumerable: true
    });
    Object.defineProperty(self, "luminance", {
      get: function(){
        return  round3(( (r/255*0.229) + (g/255*0.587) + (b/255*0.114) ) * 100);
      },
      // read only
      enumerable: true
    });
   
    /*
      Public Methods
    */
    for(var method in Color.fn){
      console.log(method, Color.fn[method]);
      Object.defineProperty(self, method, {
        get: function(){
          return Color.fn[method];
        }
      });
    }

    /* Constructor */
    (function(arg1, arg2, arg3, arg4){
      if(arg1 instanceof Color){
        self.red = arg1.red;
        self.green = arg1.green;
        self.blue = arg1.blue;
      } else if(
        typeof(arg1) == "number" &&
        typeof(arg2) == "number" &&
        typeof(arg3) == "number"
      ){
        self.red = arg1;
        self.green = arg2;
        self.blue = arg3;
        self.alpha = arg4 || 1;
      } else if(typeof(arg1) == "string"){
        if(arg1.indexOf("rgb") == 0){
          self.rgb = arg1;
        } else if(arg1.indexOf("hsl") == 0){
          self.hsl = arg1;
        } else if(arg1.indexOf("hsv") == 0){
          self.hsv = arg1;
        } else if(arg1.indexOf("cmyk") == 0){
          self.cmyk = arg1;
        } else {
          self.hex = arg1;
        }
      }
    }).apply(self, arguments);
  };

  Color.prototype.clone = function(){
    return new Color(this.red, this.green, this.blue);
  };
  Color.prototype.grayscale = function(method){
    var gv, r = this.red, g = this.green, b = this.blue;
    if(method == "average"){
      gv = (r + g + b) / 3;
    } else if(method == "max"){
      gv = Math.max(r, g, b);
    } else if(method == "min"){
      gv = Math.min(r, g, b);
    } else if(method == "desaturate"){
      var clone = self.clone();
      clone.saturation = 0;
      gv = clone.red;
    } else if(method == "rec709"){
      gv = ( (r/255*0.2125) + (g/255*0.7152) + (b/255*0.0722) ) * 255;
    } else if(method == "smpte249"){
      gv = ( (r/255*0.212) + (g/255*0.701) + (b/255*0.087) ) * 255;
    } else { // rec601
      gv = ( (r/255*0.229) + (g/255*0.587) + (b/255*0.114) ) * 255;
    }
    return new Color(gv, gv, gv, a);
  };
  Color.prototype.saturate = function(amount){
    var c = this.clone();
    c.saturation += amount;
    return c;
  };
  Color.prototype.desaturate = function(){
    return function(amount){
      var c = this.clone();
      c.saturation -= amount;
      return c;
    };
  };
  Color.prototype.darken = function(amount){
    var c = this.clone();
    c.lightness -= amount;
    return c;
  };
  Color.prototype.lighten = function(amount){
    var c = this.clone();
    c.lightness += amount;
    return c;
  };
  Color.prototype.shift = function(amount){
    var c = this.clone();
    c.hue += amount;
    return c;
  };
  Color.prototype.blend = function(color, amount){
    var amount = (amount || 50) / 100;
    return new Color(
      (color.red * amount) + (this.red * (1 - amount)),
      (color.green * amount) + (this.green * (1 - amount)),
      (color.blue * amount) + (this.blue * (1 - amount))
    );
  };
  Color.prototype.compliment = function(){
    return this.shift(180);
  };
  Color.prototype.inverse = function(){
    return new Color(
      (255 - r),
      (255 - g),
      (255 - b)
    );
  };
  Color.prototype.adjust = function(amounts){
    var allowedProps = ["red", "green", "blue", "alpha", "cyan", "magenta", "yellow", "black", "white", "hue", "saturation", "lightness", "brightness"];
    var c = this.clone();
    for(var prop in amounts){
      if(allowedProps.indexOf(prop) > -1){
        c[prop] += amounts[prop];
      }
    }
    return c;
  };

  return Color;
})();
