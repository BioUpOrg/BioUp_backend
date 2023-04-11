const exelJS = require('exceljs');
const ratingRepository = require('../../Domain/IRepositories/RatingRepository');

const exportRatings = async (req , res) => {
    try{
        const workbook = new exelJS.Workbook();
        const worksheet = workbook.addWorksheet('Ratings');
        worksheet.columns = [
            {header: 'userId,productId,rating,timestamp', key: 'id', width: 10},
    
        
        ];
        const ratings = await ratingRepository.getAll();
        ratings.forEach((rating) => {
            var insertion = rating.user+","+ rating.product+","+  rating.ratingValue.toPrecision(2) +","+ rating.createdAt.getMinutes();

            worksheet.addRow({
                id: insertion
            });
        }
        );
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=' + 'ratings.xlsx');
        return workbook.xlsx.write(res)
        .then(function(){
            res.status(200).end();
        }
        );

    } catch(error){
        console.error(error);
        throw new Error('Could not export ratings');
    }
}
module.exports = exportRatings;
