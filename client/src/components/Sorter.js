import React, { useEffect, useState } from 'react';
function Sorter({ passSortBy }) {
	const [sortBy, setSortBy] = useState('createdAt_desc');

	useEffect(() => {
		passSortBy(sortBy);
	}, [sortBy]);

	return (
		<div class="form-floating mx-1">
			<select onChangeCapture={(e) => setSortBy(e.target.value)} class="form-select px-3" id="floatingSelect" aria-label="Sort">
				<option selected value="createdAt_desc">
					Date ^
				</option>
				<option value="createdAt_asc">Date v</option>
				<option value="username_desc">Username ^</option>
				<option value="username_asc">Username v</option>
				<option value="email_desc">Email ^</option>
				<option value="email_asc">Email v</option>
			</select>
			<label className="ms-2" for="floatingSelect">
				Sort By
			</label>
		</div>
	);
}
export default Sorter;
