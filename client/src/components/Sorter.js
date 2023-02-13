import React, { useEffect, useState } from 'react';
function Sorter({ passSortBy }) {
	const [sortBy, setSortBy] = useState('createdAt_desc');

	useEffect(() => {
		passSortBy(sortBy);
	}, [passSortBy, sortBy]);

	return (
		<div className="form-floating mx-1">
			<select onChangeCapture={(e) => setSortBy(e.target.value)} className="form-select px-3" id="floatingSelect" aria-label="Sort">
				<option value="createdAt_desc" defaultValue="createdAt_desc">
					Date ^
				</option>
				<option value="createdAt_asc">Date v</option>
				<option value="username_desc">Username ^</option>
				<option value="username_asc">Username v</option>
				<option value="email_desc">Email ^</option>
				<option value="email_asc">Email v</option>
			</select>
			<label className="ms-2" htmlFor="floatingSelect">
				Sort By
			</label>
		</div>
	);
}
export default Sorter;
