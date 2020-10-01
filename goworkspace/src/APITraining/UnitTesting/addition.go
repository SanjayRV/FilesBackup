package addition

import (
	"errors"
)

// func main() {
// 	a := 10
// 	b := 20
// 	Sum := add(a, b)
// 	fmt.Println(Sum)
// }
// func add(x int, y int) int {
// 	sum := x + y
// 	return sum
// }

func Sum(numbers ...int) (int, error) {
	sum := 0
	if len(numbers) < 2 {
		errorMessage := "less than two numbers"
		return sum, errors.New(errorMessage)
	}

	for _, num := range numbers {
		sum = sum + num
	}
	return sum, nil
}
