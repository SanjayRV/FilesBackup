package addition

import "testing"

func TestSum(t *testing.T) {
	result, _ := Sum(1, 2, 3)
	if result != 5 {
		t.Errorf("Incorrect")
	} else {
		t.Logf("correct")
	}
}

func TestInvalidArgument(t *testing.T) {
	_, err := Sum(1)
	if err != nil {
		t.Logf(err.Error())
	} else {
		t.Errorf("Wrong Logic")
	}
}
