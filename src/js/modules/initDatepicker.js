// modules/datepickers.js
export default function initDatepickers() {
  const fromInput = document.querySelector("#date-from");
  const toInput = document.querySelector("#date-to");

  if (!fromInput || !toInput) return;

  [fromInput, toInput].forEach(input => input.setAttribute("autocomplete", "off"));

  let fromPicker, toPicker;

  // 2-letter weekdays
  const twoLetterMonthLocale = {
    weekdays: {
      shorthand: ["Mo","Tu","We","Th","Fr","Sa","Su"],
      longhand: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    }
  };

  // Highlight function
  const highlightRange = (dayElem, fromDate, toDate, calendarType) => {
    const day = dayElem.dateObj;
    if (!day) return;

    // Normalize dates to remove time
    const d = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
    const from = fromDate ? new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()).getTime() : null;
    const to = toDate ? new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate()).getTime() : null;

    dayElem.classList.remove("inRange"); // reset

    if (from && to && from <= to) {
      if (d >= from && d <= to) dayElem.classList.add("inRange");
    } else if (from && !to && calendarType === "from") {
      // Highlight future days only on FROM calendar
      if (d >= from) dayElem.classList.add("inRange");
    } else if (!from && to && calendarType === "to") {
      // Highlight past days only on TO calendar
      if (d <= to) dayElem.classList.add("inRange");
    }
  };

  // Initialize pickers
  toPicker = flatpickr(toInput, {
    dateFormat: "d_m_Y",
    allowInput: true,
    nextArrow: ">>",
    prevArrow: "<<",
    locale: twoLetterMonthLocale,
    onChange(selectedDates) {
      if (!fromPicker) return;
      fromPicker.set("maxDate", selectedDates[0] || null);
      fromPicker.redraw();
    },
    onDayCreate(dObj, dStr, fp, dayElem) {
      highlightRange(dayElem, fromPicker?.selectedDates[0], toPicker?.selectedDates[0], "to");
    }
  });

  fromPicker = flatpickr(fromInput, {
    dateFormat: "d_m_Y",
    allowInput: true,
    nextArrow: ">>",
    prevArrow: "<<",
    locale: twoLetterMonthLocale,
    onChange(selectedDates) {
      if (!toPicker) return;
      if (selectedDates.length) {
        toPicker.set("minDate", selectedDates[0]);
      } else {
        toPicker.set("minDate", null);
        toPicker.clear();
      }
      toPicker.redraw();
    },
    onDayCreate(dObj, dStr, fp, dayElem) {
      highlightRange(dayElem, fromPicker?.selectedDates[0], toPicker?.selectedDates[0], "from");
    }
  });

  // Clear buttons
  document.querySelectorAll(".date-picker__clear-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const input = e.target.closest(".date-picker")?.querySelector(".date-picker__input");
      if (!input) return;

      if (input.id === "date-from") {
        fromPicker.clear();
        toPicker.clear();
        fromPicker.set("maxDate", null);
        toPicker.set("minDate", null);
      } else if (input.id === "date-to") {
        toPicker.clear();
        fromPicker.set("maxDate", null);
      }

      fromPicker.redraw();
      toPicker.redraw();
    });
  });

  // Open calendar on icon click
  document.querySelectorAll(".date-picker__icon-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const input = btn.closest(".date-picker")?.querySelector(".date-picker__input");
      if (!input) return;

      if (input.id === "date-from") {
        fromPicker?.open();
      } else if (input.id === "date-to") {
        toPicker?.open();
      }
    });
  });
}
