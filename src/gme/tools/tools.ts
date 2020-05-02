import { HEIGHT, lcg, WIDTH } from "../../eng/const.js";

function startEvent(action: string, ...actions: any[]) {
  window.dispatchEvent(new CustomEvent(action, {
    detail: {
      arg1: actions[0],
      arg2: actions[1]
    }
  }));
}

function printBorders(ctx: CanvasRenderingContext2D) {
  ctx.font = "6px Roboto Mono";
  ctx.fillText("PRESS [SPACE] TO PLAY", WIDTH >> 1, HEIGHT * .95);

  ctx.textAlign = "left";
  ctx.font = "10px Roboto Mono";
  for (let r = 19; r < 234; r += 10) {
    ctx.fillText("!", 3, r);
    ctx.fillText("!", 231, r);
  }

  ctx.font = "9px Roboto Mono";
  ctx.fillText("+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+", 3, 8);
  ctx.fillText("+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+", 3, 238);
}

const start = "Al,Ae,As,Bi,Fen,Ha,Hag,Ho,Hu,Iv,Jot,Ma,Mio,Mu,Nid,Ors,Ra,Sta,Svar,Tys,Vae,Van,Vol,Y,Ygg".split(",");
const mid = "an,ar,ba,da,dra,gar,na,tal".split(",");
const end = "ad,ald,agr,ar,ard,eyr,far,frost,heim,hogg,in,mir,nar,nir,or,osk,rir,sil,sir,ttir,urd".split(",");
//start="Aam,Ab,Ad,Ahr,Alas,Al-A'w,All,Al-M,Ap,As,Ast,Az,Bal,BalS,Bag,Balb,Ban,Bansh,Baph,Barb,Bath,Bazt,Be'L,Beel,Beelz,Bel,Belph,Ber,Bh,Bifr,Biul,Bush,Caac,Cagn,Caim,Chalk,Char,Chem,Coal,Dag,Dant,Decer,Demog,Dev,Dj,Dragh,Elig,Emp,Errt,Etr,Ett,Eur,Euryn,Gorg,Graph,Grig,Haag,Halph,Haur,Hoeth,Ifr,Inc,Ibl,Ith,Kabh,Kas,Kokb',Kray,Lab,Lam,Lech,Leg,Lil,Lioth,Lix,Luc,Mal,Malph,Mamm,March,Mast,Math,Meph,Merm,Mol,Murm,Naam,Naph,Nek,Neph,Neq,Nix,Noud,Onom,Onos,Orc,Orob,Oul,Paim,Phen,Pont,Proc,Rah,Rak,Raksh,Ram,Rang,Raum,Raz,Rimm,Rub,Rus,Sabn,Salps,Sam,Sat,Sc,Scarm,Seer,Sem,Set,Shait,Shax,Shed,Shez,Sidr,Sitr,Sth,Succ,Surg,Tann,Tart,Tch,Teer,Thamm,Thub,Tlal,Tsab,Val,Vap,Vass,Vep,Verr,Vin,Vol,Vual,Xaph,Xiph,Xitr,Zaeb,Zim,Ziz,Zaln,Aer,An,Ar,Bar,Beth,Bett,Cut,Dan,Dar,Dell,Der,Edr,Er,Eth,Fin,Ian,Iarr,Ill,Jed,Kan,Kar,Ker,Kurr,Kyr,Man,Mar,Mer,Mir,Tsal,Tser,Tsir,Van,Var,Yur,Yyr,Al,Am,Arm,Arth,B,Be,Bok,Bor,Bran,Breg,Bren,Brod,Cam,Chal,Cham,Ch,Cuth,Daim,Dair,Del,Dr,Dur,Duv,Ear,Elen,Erel,Erem,Fal,Ful,Gal,G,Get,Gil,Gor,Grin,Gun,H,Hal,Han,Har,Hath,Hett,Hur,Iss,Khel,K,Kor,Lel,Lor,M,Mard,N,Ol,Radh,Rag,Relg,Rh,Run,Tarr,T,Tor,Tul,Tur,Ul,Ulf,Unr,Ur,Urth,Yar,Z,Zan,Zer,Act,Afr,Ag,Agr,Alb,Angl,Ant,Asys,Asis,At,Atl,Brund,Cath,Cor,Eb,Eg,Esc,Esp,Est,Flor,It,Lyr,Myr,Nor,Pel,Rom,Seg,Sib,Sylv,Terr,Tir,Tr,Tyr,Xan".split(",");
//mid="ba,be,chi,dra,du,ga,ghi,go,lia,ma,mba,mu,n'e,na,nti,nzu,phe,pho,r'e,rba,rgo,ssa,thi,tryu,ttu,tzi,v-e,vna,xra,ya,al,an,ar,el,en,ess,ian,onn,or,ad,ag,and,ant,anth,ard,as,at,atr,eg,ent,ern,et,in,itr,on,op,ov,ur,ymn,yr,de,do,duna,hara,kaltho,la,latha,le,nari,ra,re,rego,ro,rodda,romi,rui,sa,to,zila".split(",");
//end="b'ael,bel,bub,bur,bus,ces,chus,dai,ddon,des,dhaka,el,fer,flas,gion,gon,gor,klet,kor,ksha,kuth,laas,lech,les,lion,lith,loch,lsu,mael,math,mejes,meus,mon,moth,mmut,mosh,nai,nar,neus,nex,nias,nnin,nomos,phas,r'el,raal,rept,res,rgon,riax,rith,rius,rous,rus,ruth,sias,stor,swath,tath,than,the,thra,tryus,tura,vart,ztuk,ai,an,ar,ath,en,eo,ian,is,u,or,a,aia,ana,as,ea,ene,eos,esia,ia,iad,ias,ium,ius,on,ona,ova,um,us,ya,bar,bers,blek,chak,chik,dan,dar,das,dig,dil,din,dir,dor,dur,fang,fast,gar,gas,gen,gorn,grim,gund,had,hek,hell,hir,hor,kan,kath,khad,lach,lar,ldil,ldir,leg,len,lin,mas,mnir,ndil,ndur,neg,nik,ntir,rab,rach,rain,rak,ran,rand,rath,rek,rig,rim,rin,rion,sin,sta,stir,sus,tar,thad,thel,tir,von,vor,yon,zor".split(",");

function getName(): string {
  return `${this.start[lcg.randNbrI(start.length)]}${mid[lcg.randNbrI(mid.length)]}${end[lcg.randNbrI(end.length)]}`;
}


export { startEvent, printBorders, getName };

