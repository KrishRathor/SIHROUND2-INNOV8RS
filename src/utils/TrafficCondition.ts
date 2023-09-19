export const trafficCondition = async (s: string) => {

    // severe high, moderately high, normal, moderately fast, fast

    console.log('s', s, typeof(s));

    const speed = parseInt(s);
    console.log(speed, typeof(speed)) 
    
    if (speed <= 10) {
        return 'Severly High';
    } else if (10 < speed && speed <= 30) {
        return 'Moderately High';
    } else if (30 < speed && speed <= 50) {
        return 'Normal Traffic'
    }

    return 'No Traffic';

}