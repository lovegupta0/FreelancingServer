import java.util.Scanner;

 class Cement {
    Scanner b = new Scanner(System.in);
        System.out.println("Please enter the grade of Concrete");
     int A = Integer.parseInt(b.nextLine());
         System.out.println("Grade of Cement = M"+ A);
}
class CompressiveStrength<B, Fm> {
    Scanner c =new Scanner(System.in);
    System.out.println("Please specify the Type of Site Control");
    System.out.println("Enter  1    if it is Good Site Control ");
    System.out.println("Enter  2    if it is Fair Site Control ");
    float x;
    int D = Integer.parseInt(c.nextLine());
    if(D == 1){
        if(A = 10 || A = 15){
           x = (float) 3.5;
        }
        else if(A = 20 || A = 25){
            x = (float) 4.0;
        }
        else if(A = 30 || A = 35 || A = 40 || A = 45 || A = 50){
            x = (float) 5.0;
        }
    }
    else if( D == 2){
        if(A = 10 || A = 15){
            x = (float) 4.5;
        }
        else if(A = 20 || A = 25){
            x = (float) 5.0;
        }
        else if(A = 30 || A = 35 || A = 40 || A = 45 || A = 50){
            x = (float) 6.0;
        }
    }
    else {
        System.out.println("Please choose between the given type of controls");
    }
    double Fm= A + 1.65*x;
    System.out.println("Total Average Compressive Strength = "+ Fm);
}
 class WaterCement<y, ratio> {
     Scanner e = new Scanner(System.in);
     Scanner j = new Scanner(System.in);
     Scanner k = new Scanner(System.in);
     float y;
     int z;
    System.out.println("Please Enter the Nominal maximum size of aggregates");
     int q = Integer.parseInt(e.nextLine());
    if(q ==20)

     {
         System.out.println("Please specify the Type of Exposure");
         System.out.println("Enter  1    if it is Mild ");
         System.out.println("Enter  2    if it is Moderate");
         System.out.println("Enter  3    if it is Severe ");
         System.out.println("Enter  4    if it is Very Severe ");
         System.out.println("Enter  5    if it is Extreme ");
         int w = Integer.parseInt(j.nextLine());
         if (w == 1) {
             System.out.println("Please specify the Type of Concrete required");
             System.out.println("Enter  1    if it is Plain Concrete ");
             System.out.println("Enter  2    if it is Reinforced Concrete");
             int r = Integer.parseInt(k.nextLine());
             if (r == 1) {
                 y = (float) 0.60;
                 z = 220;
             } else if (r == 2) {
                 y = (float) 0.55;
                 z = 300;
             }
         }
         if (w == 2) {
             System.out.println("Please specify the Type of Concrete required");
             System.out.println("Enter  1    if it is Plain Concrete ");
             System.out.println("Enter  2    if it is Reinforced Concrete");
             int r = Integer.parseInt(k.nextLine());
             if (r == 1) {
                 y = (float) 0.60;
                 z = 240;
             } else if (r == 2) {
                 y = (float) 0.50;
                 z = 300;
             }
         }
         if (w == 3) {
             System.out.println("Please specify the Type of Concrete required");
             System.out.println("Enter  1    if it is Plain Concrete ");
             System.out.println("Enter  2    if it is Reinforced Concrete");
             int r = Integer.parseInt(k.nextLine());
             if (r == 1) {
                 y = (float) 0.50;
                 z = 250;
             } else if (r == 2) {
                 y = (float) 0.45;
                 z = 320;
             }
         }
         if (w == 4) {
             System.out.println("Please specify the Type of Concrete required");
             System.out.println("Enter  1    if it is Plain Concrete ");
             System.out.println("Enter  2    if it is Reinforced Concrete");
             int r = Integer.parseInt(k.nextLine());
             if (r == 1) {
                 y = (float) 0.45;
                 z = 260;
             } else if (r == 2) {
                 y = (float) 0.45;
                 z = 340;
             }
         }
         if (w == 5) {
             System.out.println("Please specify the Type of Concrete required");
             System.out.println("Enter  1    if it is Plain Concrete ");
             System.out.println("Enter  2    if it is Reinforced Concrete");
             int r = Integer.parseInt(k.nextLine());
             if (r == 1) {
                 y = (float) 0.40;
                 z = 280;
             } else if (r == 2) {
                 y = (float) 0.40;
                 z = 360;
             }
         } else {
             System.out.println("According to Table 5 of IS456  Nominal maximum size of aggregates should be of 20mm ");
         }
     }
    float ratio= (float) (y - 0.05);
    System.out.println("Adopted maximum water cement ratio is = "+ ratio);
    System.out.println("Minimum Cement Content kg/m3 is = " + z );
 }

 class WaterContent{
     Scanner u = new Scanner(System.in);
     System.out.println("Maximum water content for 20mm max nominal size of Aggregate is = 186 kg/m3" );
     System.out.println("Please Specify the type of aggregate" );
     System.out.println("Enter 1 if it is sub-angular aggregates");
     System.out.println("Enter 2 if it is gravel with some crushed particles");
     System.out.println("Enter 3 if it is rounded gravel");
     int i = Integer.parseInt(u.nextLine());
     float correction;
     if(i == 1){
         correction = 176;
     }
     else if(i == 2){correction = 166;}
     else if(i == 3){correction = 161;}
     System.out.println("Enter the slump range for the desired workability in mm");
     int o = Integer.parseInt(u.nextLine());
     int m = (o-50)/25;
     float WW = (float) (m*186*0.03 + correction);
     System.out.println("The required water content is ="+ WW +"kg/m3");
     float WC = WW/ratio ;
     System.out.println("The required cement content is = "+ WC +"kg/m3");
     if(WC > z){
         System.out.println("This is greater than" + z +"kg/m3");
     }
 }
 class CoarseAggregates{
     Scanner p = new Scanner(System.in);
      System.out.println("Please specify the ZONE of the Fine Aggregates ");
      System.out.println("Enter 1 if it is ZONE I");
      System.out.println("Enter 2 if it is ZONE II");
      System.out.println("Enter 3 if it is ZONE III");
      System.out.println("Enter 4 if it is ZONE IV");
      float VCM;
      int i = Integer.parseInt(p.nextLine());
      if(i == 1){ VCM = (float) 0.60;}
      else if(i == 2){ VCM = (float) 0.62;}
      else if(i == 3){ VCM = (float) 0.64;}
      else if(i == 4){ VCM = (float) 0.66;}
      System.out.println("Please enter the Specific gravity of Cement");
      float Spc = Float.parseFloat(p.nextLine());
      System.out.println("Please enter the Specific gravity of Water");
      float Spw = Float.parseFloat(p.nextLine());
      System.out.println("Please enter the Specific gravity of CoarseAggregates");
      float Spca = Float.parseFloat(p.nextLine());
      System.out.println("Please enter the Specific gravity of FineAggregates");
      float Spfa = Float.parseFloat(p.nextLine());
      float V = (1-(WC/(Spc*1000))-(WW/Spw*1000));
      float VCA = VCM*V; float VFA = (1-VCM)*V;
      float WCA = VCA*Spca*1000; float WFA = VFA*Spfa*1000;
      System.out.println("Volume of Coarse Aggregates is = "+ VCA +"m3");
      System.out.println("Volume of Fine Aggregates is = " + VFA +"m3");
      System.out.println("Weight of Coarse Aggregates is = "+ WCA +"Kg/m3");
      System.out.println("Weight of Fine Aggregates is = "+ WFA +"Kg/m3");
      System.out.println("Hence the Mix Proportion by Weight is ");
      System.out.print("CEMENT : FINE AGGREGATE : COARSE AGGREGATE  = ");
      System.out.print(1 + ":" + WFA/WC + ":" + WCA/WC);

 }

}
public class DesignMix {
    public static void main(String[] args) {
       Cement cm = new Cement();
       CompressiveStrength cs = new CompressiveStrength();
       WaterCement wc = new WaterCement();
       WaterContent wco = new WaterContent();
       CoarseAggregates coag = new CoarseAggregates();

    }


}
