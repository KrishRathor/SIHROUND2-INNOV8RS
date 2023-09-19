export const time = async (s: string) => {

    // severe high, moderately high, normal, moderately fast, fast

    console.log('s', s, typeof(s));

    const speed = parseInt(s);
    console.log(speed, typeof(speed)) 
    
    if (speed <= 10) {
        return 2;
    } else if (10 < speed && speed <= 30) {
        return 3;
    } else if (30 < speed && speed <= 50) {
        return 4;
    }

    return 5;

}