'use strict';

// An original, hand-plotted sprite. Every shape is rasterised to whole pixels.
// The reference image is never loaded, sampled, resized, or filtered.
function drawAmmuPortrait(canvas) {
  canvas.width = 96;
  canvas.height = 120;
  const c = canvas.getContext('2d');
  c.imageSmoothingEnabled = false;
  const p = {
    paper:'#fbf0db', ink:'#292021', hair:'#302424', mid:'#45312b', light:'#604238',
    shine:'#815744', skin:'#f2b98d', skinLight:'#ffd1a3', shadow:'#d98d6c',
    cream:'#fff7e2', white:'#fffdf3', gold:'#d9a74f', goldLight:'#ffe09a',
    olive:'#b5b850', oliveLight:'#d3cd72', oliveDark:'#85883e', teal:'#4f8c80',
    tealLight:'#76ad99', pink:'#e87d82', book:'#754139', bookLight:'#985a48', bookDark:'#4d2d30'
  };
  function box(x,y,w,h,color) { c.fillStyle=p[color]||color; c.fillRect(x,y,w,h); }
  function shape(points,color) {
    // Scanline filling makes even diagonals stepped, without antialiasing.
    const lo=Math.min(...points.map(v=>v[1])),hi=Math.max(...points.map(v=>v[1]));
    for(let y=lo;y<hi;y++) {
      const hits=[];
      for(let i=0,j=points.length-1;i<points.length;j=i++) {
        const a=points[j],b=points[i],scan=y+.5;
        if((a[1]<=scan&&b[1]>scan)||(b[1]<=scan&&a[1]>scan)) hits.push(a[0]+(scan-a[1])*(b[0]-a[0])/(b[1]-a[1]));
      }
      hits.sort((a,b)=>a-b);
      for(let i=0;i<hits.length;i+=2) box(Math.round(hits[i]),y,Math.round(hits[i+1])-Math.round(hits[i]),1,color);
    }
  }
  function line(points,color,width=1) {
    for(let i=1;i<points.length;i++) {
      let [x,y]=points[i-1];const [ex,ey]=points[i],dx=Math.abs(ex-x),dy=-Math.abs(ey-y),sx=x<ex?1:-1,sy=y<ey?1:-1;let err=dx+dy;
      for(;;){box(x,y,width,width,color);if(x===ex&&y===ey)break;const e=2*err;if(e>=dy){err+=dy;x+=sx;}if(e<=dx){err+=dx;y+=sy;}}
    }
  }
  function heart(x,y,color) { ['0110110','1111111','1111111','0111110','0011100','0001000'].forEach((row,j)=>[...row].forEach((v,i)=>{if(v==='1')box(x+i,y+j,1,1,color);})); }
  box(0,0,96,120,'paper');
  // Small, deliberately plotted gold flourishes.
  heart(8,40,'gold');heart(82,48,'gold');
  line([[14,24],[12,20]],'gold',2);line([[20,20],[19,15]],'gold',2);
  box(82,29,1,5,'gold');box(80,31,5,1,'gold');box(10,74,1,3,'gold');box(9,75,3,1,'gold');

  // The long, wavy hair silhouette.
  shape([[40,10],[48,7],[61,9],[67,13],[74,13],[79,19],[83,28],[82,37],[86,44],[85,53],[88,61],[85,69],[88,78],[85,86],[88,96],[84,105],[75,110],[66,108],[55,112],[42,109],[34,113],[25,109],[16,108],[11,101],[13,91],[9,84],[13,74],[11,65],[15,55],[14,47],[18,35],[21,27],[28,19]],'ink');
  shape([[41,12],[52,10],[64,13],[68,17],[76,18],[79,29],[78,40],[82,49],[81,61],[84,71],[81,81],[84,94],[80,103],[70,105],[62,104],[53,108],[42,104],[33,109],[25,105],[17,104],[15,97],[18,88],[14,81],[17,72],[15,65],[20,54],[18,47],[22,35],[26,28],[32,21]],'hair');
  // Broad, restrained highlights follow the waves instead of adding noise.
  line([[20,56],[22,44],[29,31],[40,21],[52,16],[62,16]],'mid',3);
  line([[18,76],[21,65],[20,58],[24,48],[32,38]],'light',2);
  line([[22,95],[26,90],[25,79],[28,71]],'mid',3);
  line([[29,105],[34,101],[35,90],[32,83]],'light',2);
  line([[75,26],[78,36],[76,44],[81,54],[78,66],[81,76],[78,86],[81,96],[77,101]],'mid',3);
  line([[79,54],[76,62],[79,71]],'light');

  // Olive cardigan, teal top, and neck.
  shape([[29,76],[37,72],[59,73],[72,77],[80,85],[85,108],[78,113],[62,114],[57,111],[43,115],[25,112],[16,108],[18,90],[23,81]],'ink');
  shape([[29,79],[38,75],[59,76],[71,80],[77,87],[82,107],[76,111],[59,111],[45,112],[26,109],[19,106],[21,91],[25,84]],'olive');
  shape([[38,77],[46,76],[61,78],[66,109],[55,114],[44,111]],'teal');
  shape([[43,79],[48,80],[55,110],[49,111]],'tealLight');
  shape([[39,67],[59,66],[61,77],[52,83],[42,78]],'shadow');
  shape([[42,67],[56,67],[57,76],[51,80],[44,76]],'skin');
  line([[32,81],[27,89],[30,100],[26,106]],'oliveLight',3);
  line([[70,84],[74,94],[78,105]],'oliveLight',3);
  line([[35,99],[39,111]],'oliveDark',2);

  // Face, ear, and an asymmetric fringe.
  shape([[37,31],[48,26],[62,27],[72,34],[77,47],[75,61],[68,70],[56,75],[44,72],[34,65],[28,55],[29,44]],'ink');
  shape([[38,32],[49,28],[61,29],[70,35],[74,46],[73,59],[66,67],[56,72],[45,69],[36,63],[32,53],[32,43]],'skin');
  shape([[45,34],[58,30],[66,33],[70,40],[71,55],[66,64],[55,69],[45,66],[39,57],[37,44]],'skinLight');
  shape([[30,46],[26,47],[25,51],[27,57],[32,59],[35,55],[33,48]],'shadow');
  shape([[29,48],[27,49],[28,54],[31,56],[33,53],[32,49]],'skin');
  line([[28,50],[31,51],[30,53]],'light');
  shape([[29,43],[32,33],[42,23],[53,18],[65,21],[71,29],[72,37],[68,34],[65,30],[63,33],[59,33],[58,30],[55,35],[50,37],[47,41],[42,42],[38,46],[32,46],[33,52],[30,50]],'hair');
  line([[29,38],[36,29],[46,23],[56,21],[64,23]],'light',2);
  line([[34,41],[41,36],[45,31],[54,27],[61,27]],'mid',2);
  line([[42,36],[48,33],[52,29]],'light');
  line([[63,31],[65,26],[67,27]],'mid');

  // Eyebrows and large, heart-lit eyes.
  line([[38,43],[43,41],[48,41],[52,43]],'ink');
  line([[61,44],[65,43],[69,44]],'ink');
  shape([[37,48],[40,45],[47,45],[52,49],[52,57],[49,62],[41,62],[37,58]],'ink');
  shape([[38,49],[41,46],[46,46],[50,49],[50,57],[47,60],[41,60],[38,57]],'white');
  shape([[45,48],[49,48],[51,51],[50,58],[47,61],[43,60],[42,56],[43,51]],'ink');
  box(45,49,1,2,'white');heart(44,54,'white');
  shape([[59,49],[63,46],[68,47],[71,51],[70,60],[67,64],[61,63],[58,59]],'ink');
  shape([[60,50],[63,48],[67,48],[69,51],[68,59],[65,62],[61,60],[60,57]],'white');
  shape([[65,49],[69,50],[70,54],[68,60],[65,63],[62,60],[62,55]],'ink');
  box(65,50,1,2,'white');heart(62,56,'white');
  // White spectacle rims, bridge, and temples, all one-pixel stepped lines.
  line([[32,46],[37,45],[48,45],[53,48],[54,55],[52,61],[48,64],[40,64],[35,60],[34,52],[32,49],[32,46]],'cream');
  line([[57,51],[60,47],[68,47],[73,50],[74,55],[71,63],[67,66],[61,65],[57,61],[56,56],[57,51]],'cream');
  line([[53,51],[55,50],[58,52]],'cream');line([[73,50],[77,48]],'cream');line([[32,46],[28,44]],'cream');
  // Tiny forehead flower, bindi, and blush.
  box(58,37,1,3,'white');box(57,38,3,1,'white');box(58,38,1,1,'gold');box(58,41,1,1,'ink');
  line([[35,61],[33,64]],'pink');line([[38,62],[36,65]],'pink');line([[41,63],[39,66]],'pink');
  line([[69,64],[67,67]],'pink');line([[72,63],[70,66]],'pink');

  // A small gold jhumka, including the hollow hoop and bell fringe.
  box(28,58,2,2,'goldLight');line([[27,60],[25,62],[25,65],[28,67],[31,65],[31,62],[29,60]],'gold');
  box(27,66,2,3,'goldLight');shape([[26,68],[30,68],[33,73],[24,73]],'gold');
  line([[27,69],[25,72],[31,72],[29,69]],'goldLight');box(24,74,2,2,'goldLight');box(28,74,2,2,'goldLight');box(32,74,2,2,'goldLight');

  // An open, cloth-bound book with a central spine and golden corner details.
  shape([[45,70],[64,77],[69,77],[86,70],[92,75],[87,84],[84,101],[68,111],[61,111],[37,99]],'ink');
  shape([[46,71],[63,77],[66,80],[64,83],[43,77]],'cream');
  shape([[68,80],[74,75],[85,72],[89,74],[88,77],[72,83]],'cream');
  line([[48,73],[61,78]],'gold');line([[73,78],[85,74]],'gold');
  shape([[43,77],[63,83],[61,107],[38,98]],'book');
  shape([[69,84],[89,77],[82,100],[67,108]],'book');
  shape([[63,83],[69,83],[67,108],[63,110],[61,107]],'bookDark');
  line([[45,79],[61,84],[59,103],[41,97],[45,79]],'bookLight');
  line([[71,86],[86,80],[80,97],[69,104]],'bookLight');
  line([[47,81],[48,84],[51,83]],'gold');line([[45,93],[43,95],[47,96]],'gold');
  line([[82,82],[83,84],[85,81]],'gold');line([[76,97],[79,96],[79,93]],'gold');
  line([[72,89],[80,86]],'gold');line([[72,92],[78,90]],'gold');
  line([[64,87],[67,87]],'gold');line([[64,90],[67,90]],'gold');

  // Fingers curl around the book; cuff edges retain the sprite silhouette.
  shape([[36,83],[39,80],[43,81],[45,84],[44,86],[41,86],[44,88],[44,90],[41,91],[42,94],[39,98],[35,97],[31,92],[31,87]],'ink');
  shape([[36,84],[39,82],[42,83],[43,85],[39,85],[38,87],[42,88],[42,90],[38,90],[39,93],[37,96],[34,94],[33,90],[33,87]],'skinLight');
  box(34,94,3,2,'skin');line([[32,94],[39,99],[35,105],[28,101]],'oliveDark',2);
  shape([[81,85],[85,84],[89,87],[89,93],[86,99],[81,100],[77,97],[77,94],[80,92],[78,91],[79,88]],'ink');
  shape([[81,87],[85,86],[87,88],[87,92],[84,97],[81,98],[79,96],[80,94],[83,92],[80,91],[81,89],[85,90]],'skinLight');
  line([[81,99],[85,101],[80,107],[75,104]],'oliveDark',2);
  // A few final foreground locks frame the shoulders.
  line([[22,68],[24,76],[22,83],[26,90],[25,97]],'hair',4);
  line([[24,76],[24,82],[27,88]],'light');
  line([[73,103],[71,108],[66,110]],'hair',3);
}

drawAmmuPortrait(document.getElementById('portrait-art'));
